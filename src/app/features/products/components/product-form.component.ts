import {
  AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { dateReleaseValidator } from '../../../shared/validators/date-release.validator';
import { dateRevisionValidator } from '../../../shared/validators/date-revision.validator';
import { productIdAvailableValidator } from '../../../shared/validators/product-id-available.validator';
import { addYearsToIsoDate } from '../../../shared/utils/date.utils';
import { Product } from '../models/product.model';
import { CreateProductPayload, UpdateProductPayload } from '../models/product.payloads';
import { ProductApiService } from '../services/product-api.service';

export type ProductFormMode = 'create' | 'edit';
export type ProductFormSubmitPayload = CreateProductPayload | UpdateProductPayload;

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly productApiService = inject(ProductApiService);
  private readonly idAvailabilityValidator: AsyncValidatorFn = productIdAvailableValidator(
    this.productApiService
  );

  @Input() mode: ProductFormMode = 'create';
  @Input() product: Product | null = null;
  @Input() submitting = false;
  @Input() submitError: string | null = null;

  @Output() readonly submitted = new EventEmitter<ProductFormSubmitPayload>();
  @Output() readonly resetRequested = new EventEmitter<void>();

  readonly form = this.formBuilder.group(
    {
      id: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        asyncValidators: [this.idAvailabilityValidator]
      }),
      name: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      description: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      logo: this.formBuilder.nonNullable.control('', [Validators.required]),
      date_release: this.formBuilder.nonNullable.control('', [
        Validators.required,
        dateReleaseValidator()
      ]),
      date_revision: this.formBuilder.nonNullable.control('', [Validators.required])
    },
    {
      validators: [dateRevisionValidator('date_release', 'date_revision')]
    }
  );

  constructor() {
    this.form.controls.date_release.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((dateRelease) => {
        this.form.controls.date_revision.setValue(dateRelease ? addYearsToIsoDate(dateRelease) : '', {
          emitEvent: false
        });
        this.form.controls.date_revision.updateValueAndValidity({ emitEvent: false });
        this.form.updateValueAndValidity({ emitEvent: false });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.syncMode();
    }

    if (changes['product'] && this.product) {
      this.applyProductValue(this.product);
    }
  }

  submitForm(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.pending || this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();

    if (this.mode === 'edit') {
      const { id: _id, ...payload } = formValue;
      this.submitted.emit(payload as UpdateProductPayload);
      return;
    }

    this.submitted.emit(formValue as CreateProductPayload);
  }

  resetForm(): void {
    if (this.mode === 'edit' && this.product) {
      this.applyProductValue(this.product);
    } else {
      this.form.reset({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: ''
      });
    }

    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.syncMode();
    this.resetRequested.emit();
  }

  getPrimaryActionLabel(): string {
    if (this.submitting) {
      return this.mode === 'edit' ? 'Guardando...' : 'Agregando...';
    }

    return this.mode === 'edit' ? 'Guardar' : 'Agregar';
  }

  hasControlError(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  getControlErrorMessage(controlName: keyof typeof this.form.controls): string | null {
    const control = this.form.controls[controlName];

    if (!this.hasControlError(controlName) && !control.pending) {
      return null;
    }

    if (controlName === 'id' && control.pending) {
      return 'Verificando disponibilidad del ID...';
    }

    const errors = control.errors;

    if (!errors) {
      return null;
    }

    switch (controlName) {
      case 'id':
        return this.getIdErrorMessage(errors);
      case 'name':
        return this.getNameErrorMessage(errors);
      case 'description':
        return this.getDescriptionErrorMessage(errors);
      case 'logo':
        return errors['required'] ? 'El logo es obligatorio.' : null;
      case 'date_release':
        if (errors['required']) {
          return 'La fecha de liberación es obligatoria.';
        }

        return errors['dateReleaseInPast']
          ? 'La fecha de liberación debe ser igual o posterior a hoy.'
          : null;
      case 'date_revision':
        if (errors['required']) {
          return 'La Fecha de revisión es obligatoria.';
        }

        return this.hasDateRevisionMismatch()
          ? 'La Fecha de revisión debe ser exactamente un año posterior a la fecha de liberación.'
          : null;
      default:
        return null;
    }
  }

  hasDateRevisionMismatch(): boolean {
    return (
      this.form.hasError('dateRevisionMismatch') &&
      (this.form.controls.date_release.touched ||
        this.form.controls.date_release.dirty ||
        this.form.controls.date_revision.touched ||
        this.form.controls.date_revision.dirty)
    );
  }

  private syncMode(): void {
    const idControl = this.form.controls.id;

    if (this.mode === 'edit') {
      idControl.clearAsyncValidators();
      idControl.disable({ emitEvent: false });
      idControl.updateValueAndValidity({ emitEvent: false });
      return;
    }

    idControl.setAsyncValidators([this.idAvailabilityValidator]);
    idControl.enable({ emitEvent: false });
    idControl.updateValueAndValidity({ emitEvent: false });
  }

  private applyProductValue(product: Product): void {
    this.form.reset(
      {
        id: product.id,
        name: product.name,
        description: product.description,
        logo: product.logo,
        date_release: product.date_release,
        date_revision: product.date_revision
      },
      { emitEvent: false }
    );
    this.form.updateValueAndValidity({ emitEvent: false });
    this.syncMode();
  }

  private getIdErrorMessage(errors: ValidationErrors): string | null {
    if (errors['required']) {
      return 'El ID es obligatorio.';
    }

    if (errors['minlength']) {
      return 'El ID debe tener al menos 3 caracteres.';
    }

    if (errors['maxlength']) {
      return 'El ID no puede superar 10 caracteres.';
    }

    if (errors['productIdTaken']) {
      return 'El ID ya existe.';
    }

    if (errors['productIdVerificationFailed']) {
      return 'No fue posible verificar el ID en este momento.';
    }

    return null;
  }

  private getNameErrorMessage(errors: ValidationErrors): string | null {
    if (errors['required']) {
      return 'El nombre es obligatorio.';
    }

    if (errors['minlength']) {
      return 'El nombre debe tener al menos 5 caracteres.';
    }

    if (errors['maxlength']) {
      return 'El nombre no puede superar 100 caracteres.';
    }

    return null;
  }

  private getDescriptionErrorMessage(errors: ValidationErrors): string | null {
    if (errors['required']) {
      return 'La descripción es obligatoria.';
    }

    if (errors['minlength']) {
      return 'La descripción debe tener al menos 10 caracteres.';
    }

    if (errors['maxlength']) {
      return 'La descripción no puede superar 200 caracteres.';
    }

    return null;
  }
}
