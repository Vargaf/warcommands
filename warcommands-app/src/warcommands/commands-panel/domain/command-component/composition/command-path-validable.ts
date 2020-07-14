import { FormGroup } from '@angular/forms';

export abstract class CommandPathValidable {

    isCommandValid = true;
    formErrorMessage: string;
    commandForm: FormGroup;

    abstract initializeForm(): void;
    abstract getCommandErrorMessages(): String[];

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