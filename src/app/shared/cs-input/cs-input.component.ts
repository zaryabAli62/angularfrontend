import { ChangeDetectorRef, Component, EventEmitter, Inject, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, NgModel, Validators } from '@angular/forms';
import { tap, takeUntil, Subject } from 'rxjs';

@Component({
    selector: "cs-input",
    templateUrl: "./cs-input.component.html",
    styleUrls: ["./cs-input.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CsInputComponent),
            multi: true
        }
    ]
})
export class CsInputComponent implements OnInit, ControlValueAccessor {
    public control!: FormControl;
    public value:any;
    destroy : Subject<void> = new Subject<void>();
    disabled!:any;
    constructor(
        @Inject(Injector) public injector: Injector,
        public cdr: ChangeDetectorRef
    ) {}

    @Input() label: string = "";
    @Input() isSubmitted:any;
    @Input() placeholder = "Please enter ";
    @Input() name :any;
    @Input() required: boolean = false;
    @Input() readonly: boolean = false;
    @Input() size = "md";
    @Input() width = "auto";
    @Input() prefix = null;
    @Input() type = "text";
    @Input() icon!: string;
    @Input() isDataLoading = false;
    @Input() separator = 2;
    @Input() invalid=false;

    @Output() public inputChange = new EventEmitter<string | number>();
    @Output() public onEnter: EventEmitter<any> = new EventEmitter();
    @Output() public additionalLabelClick = new EventEmitter<any>();

    public ngOnInit(): void {
        this.cdr.detectChanges();
        this.setComponentControl();
    }

    //Output Event function

    onInputChange(event:any) {
        this.inputChange.emit(event);
    }
    public onValue(value:any): void {
        this.onChange(this.value);
        this.onTouch();
        this.inputChange.emit(value);
    }
    public onValueNumber(value:any): void {
        // const priceString = value.target.value.replace(/[^\d.]/g, ""); // Remove non-numeric characters, including commas
        // const price = parseFloat(priceString) || 0; // Convert string to number
        this.onChange(this.value);
        this.onTouch();
        value ? this.inputChange.emit(this.value) : null;
    }



    setComponentControl(): void {
        const injectedControl = this.injector.get(NgControl);

        switch (injectedControl.constructor) {
            case NgModel: {
                const { control, update } = injectedControl as NgModel;

                this.control = control;
            

                this.control.valueChanges
                    .pipe(
                        tap((value: any) => update.emit(value)),
                        takeUntil(this.destroy)
                    )
                    .subscribe();

                break;
            }
            case FormControlName: {
       
                this.control = this.injector
                    .get(FormGroupDirective)
                    .getControl(injectedControl as FormControlName);

                break;
            }
            default: {
                this.control = (injectedControl as FormControlDirective).form as FormControl;

                break;
            }
        }
    }

    //value Accessor functions
    onChange: any = () => {};
    onTouch: any = () => {};
    private onTouched: any = () => {};
    writeValue(value: any): void {
        this.value = value;
        this.onChange(value);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onChange = fn;
    }
    registerOnDisabledChange(fn: () => void): void {
        this.onChange = fn;
    }

    ngOnDestroy() {

      this.destroy.next();
      this.destroy.complete();
  }
}
