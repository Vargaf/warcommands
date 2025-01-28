import { UntypedFormGroup } from '@angular/forms';

export abstract class CommandFormValidable {

    isCommandValid = true;
    formErrorMessage!: string;
    commandForm!: UntypedFormGroup;

    protected abstract initializeForm(): void;
    protected abstract getCommandErrorMessages(): String[];

    commandFormStatusChange(): void {
        if (this.commandForm.valid) {
            this.isCommandValid = true;
        } else {
            this.isCommandValid = false;
            this.buildCommandErrorMessage();
        }
    }

    private buildCommandErrorMessage(): void {
        const errorFormMessage: String[] = this.getCommandErrorMessages();
        this.formErrorMessage = errorFormMessage.join('\n\n');
    }

}