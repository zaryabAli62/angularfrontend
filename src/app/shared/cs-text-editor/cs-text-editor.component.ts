
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Injector,
    Input,
    OnInit,
    Output,
    ViewChild,
    forwardRef
} from "@angular/core";
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    FormControl,
    NgControl,
    NgModel,
    FormControlName,
    FormGroupDirective,
    FormControlDirective
} from "@angular/forms";
import Quill from "quill";
import { tap, takeUntil, Subject } from "rxjs";

@Component({
    selector: "cs-text-editor",
    templateUrl: "./cs-text-editor.component.html",
    styleUrls: ["./cs-text-editor.component.scss"],
    providers: [
        
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CsTextEditorComponent),
            multi: true
        }
    ]
})
export class CsTextEditorComponent implements OnInit, ControlValueAccessor {
    public control!: FormControl;
    public value: any;
    destroy : Subject<void> = new Subject<void>();
    disabled!: boolean;
    constructor(
        @Inject(Injector) public injector: Injector,
        public cdr: ChangeDetectorRef
    ) {}

    @Input() label: string = "";
    @Input() isSubmitted: any;
    @Input() placeholder = "Please enter";
    @Input() name:string = '';
    @Input() required: boolean = false;
    @Input() readonly: boolean = false;
    @Input() size = "md";
    @Input() width = "auto";
    v: any;

    @Output() public inputChange = new EventEmitter<string | number>();
    @Output() valueChange = new EventEmitter();
    @ViewChild('quillEditor') quillEditor: any;  // Reference to Quill editor instance
    @Output() doubleClickEvent = new EventEmitter<string>();  // Emits selected text


    public ngOnInit(): void {
        this.cdr.detectChanges();
        this.setComponentControl();
    }

    //Output Event function
    onInputChange(event: { html: any; }) {
        // if (event?.html) {
        let value = event?.html;
        // this.value=value
        this.onChange(value);
        this.onTouch();
        this.inputChange.emit(value);
        // }
    }

    onEditorDoubleClick() {
        const quill = this.quillEditor?.quillEditor as Quill;  // Get the Quill instance
        if (quill) {
          const selection = quill.getSelection();  // Get the current selection range
          if (selection && selection.length > 0) {
            const selectedText = quill.getText(selection.index, selection.length);  // Get the selected text
            
            this.doubleClickEvent.emit(selectedText);  // Emit the selected text to the parent component
          }
        }
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

    @Input() quillConfig = {
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike"], // toggled buttons
                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: "ordered" }, { list: "bullet" }], // superscript/subscript
                [{ indent: "-1" }, { indent: "+1" }] // outdent/indent
            ]
        },
        keyboard: {
            bindings: {
                enter: {
                    key: 13,
                    handler: (range: any, context: any) => {
                        return true;
                    }
                }
            }
        }
    };

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
