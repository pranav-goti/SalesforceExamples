// this file you need to create in parent component and from that you will need to pass this in child component.

const validationResult = {
    isUpper : {
        className : 'align-items',
        iconName : 'utility:close',
        iconSize : 'xx-small',
        alternativeText : '',
        title : '',
        message : 'Upper Case',
        isValid : false
    },
    isSpecial : {
        className : 'align-items',
        iconName : 'utility:close',
        iconSize : 'xx-small',
        alternativeText : '',
        title : '',
        message : 'Special Character',
        isValid : false
    },
    isNumber : {
        className : 'align-items',
        iconName : 'utility:close',
        iconSize : 'xx-small',
        alternativeText : '',
        title : '',
        message : 'Numbers',
        isValid : false
    },
    isLength : {
        className : 'align-items',
        iconName : 'utility:close',
        iconSize : 'xx-small',
        alternativeText : '',
        title : '',
        message : 'More than 8 Characters',
        isValid : false
    }
}

export { validationResult }
