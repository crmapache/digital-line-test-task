const validationRules: any = {
  required: ({ value, error }: { value: string; error: string }): boolean | string => {
    if (value) {
      return true;
    }

    return error || 'This field is required';
  },
  email: ({ value, error }: { value: string; error: string }): boolean | string => {
    if (/^.+@.+\..{2,}/.test(value)) {
      return true;
    }

    return error || 'Please enter your email';
  },
  min: ({
    value,
    payload,
    error,
  }: {
    value: string;
    payload: number;
    error: string;
  }): boolean | string => {
    if (value.length >= payload) {
      return true;
    }

    return error || `Minimum field value is ${payload}`;
  },
  max: ({
    value,
    payload,
    error,
  }: {
    value: string;
    payload: number;
    error: string;
  }): boolean | string => {
    if (value.length <= payload) {
      return true;
    }

    return error || `Maximum field value is ${payload}`;
  },
  regex: ({
    value,
    payload,
    error,
  }: {
    value: string;
    payload: string;
    error: string;
  }): boolean | string => {
    if (new RegExp(payload).test(value)) {
      return true;
    }

    return error || 'Field not match regex validation';
  },
  notRegex: ({
    value,
    payload,
    error,
  }: {
    value: string;
    payload: string;
    error: string;
  }): boolean | string => {
    if (new RegExp(payload).test(value)) {
      return error || 'Field match regex validation';
    }

    return true;
  },
  checked: ({ value, error }: { value: string; error: string }): boolean | string => {
    if (value) {
      return true;
    }

    return error || 'Field must be checked';
  },
  selected: ({
    value,
    payload,
    error,
  }: {
    value: string | string[];
    payload: string | string[];
    error: string;
  }): boolean | string => {
    const isSelected = () => {
      return !payload && value.length > 0;
    };

    const isSelectedOne = () => {
      if (typeof payload === 'string' && payload.length > 0) {
        if (typeof value === 'string' && value === payload) {
          return true;
        } else if (value.includes(payload)) {
          return true;
        }
      }

      return false;
    };

    const isSelectedMany = () => {
      if (
        Array.isArray(payload) &&
        Array.isArray(value) &&
        payload.reduce((state, cur) => {
          if (!value.includes(cur)) {
            return false;
          }

          return state;
        }, true)
      ) {
        return true;
      }

      return false;
    };

    if (isSelected() || isSelectedOne() || isSelectedMany()) {
      return true;
    }

    return error || 'Select field error';
  },
  lessThan: ({
    value,
    payload,
    error,
  }: {
    value: string | number;
    payload: string | number;
    error: string;
  }): boolean | string => {
    if (value < payload) {
      return true;
    }

    return error || `Value must be less than ${payload}`;
  },
  moreThan: ({
    value,
    payload,
    error,
  }: {
    value: string | number;
    payload: string | number;
    error: string;
  }): boolean | string => {
    if (value > payload) {
      return true;
    }

    return error || `Value must be more than ${payload}`;
  },
};

export default validationRules;
