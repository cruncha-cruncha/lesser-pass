export const validateField = ({ field, value }) => {
  switch (field) {
    case "account": {
      const max = 140;
      if (!value || value.length < 1) {
        return { valid: false };
      } else if (value.length > max) {
        return { valid: false, coerced: value.substring(0, max) };
      } else {
        return { valid: true, coerced: value };
      }
    }
    case "username": {
      const max = 140;
      if (!value || value.length < 1) {
        return { valid: false };
      } else if (value.length > max) {
        return { valid: false, coerced: value.substring(0, max) };
      } else {
        return { valid: true, coerced: value };
      }
    }
    case "length": {
      const max = 40;
      if (!value || value < 1) {
        return { valid: false, coerced: 1 };
      } else if (value.length > max) {
        return { valid: false, coerced: max };
      } else {
        return { valid: true, coerced: value };
      }
    }
    case "index": {
      if (!value) {
        return { valid: false, coerced: 0 };
      } else {
        return { valid: true, coerced: value };
      }
    }
    case "notes": {
      const max = 512;
      if (value && value.length > max) {
        return { valid: false, coerced: value.substring(0, max) };
      } else {
        return { valid: true, coerced: value };
      }
    }
    default:
      return { valid: false };
  }
}