export interface PhoneState {
    currentPhoneDigit: number,
    maxPhoneLength: number,
    hasStarted: boolean,
    hasEnded: boolean,
    shuffleInterval: number,

    int: number,
}
export interface PhoneProps {
    phoneNumber: string,
    onChange: (e: React.ReactNode) => void,
    onClear: () => void
}

export interface BirthdayState {
    birthdayMonthRender: React.ReactNode,
    birthdayDateRender: React.ReactNode,
}

export interface FormState {
    name: string,
    desc: string,
    comment: string,
    phoneNumber: string,
    birthdayMonth: string,
    birthdayDate: string,
}

export interface FormDataState {
    name: string,
    desc: string,
    comment: string,
    phoneNumber: string,
    birthdayMonth: string,
    birthdayDate: string,
}

export interface HomeState {
    currentId: number,
    showPopup: boolean,
    formsRender: React.ReactNode,
    popupRender: React.ReactNode,
    demoForm: object,
}
