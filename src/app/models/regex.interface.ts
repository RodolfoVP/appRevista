export class validacion {
    static letrasEspacios = '^[a-zA-Z-ZáéíóúÁÉÍÓÚñÑ\\-. ]+$';
    static letrasNumeros = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s\\-.0-9]+$';
    static email = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    static telefono = '^\+?[1-9]\d{1,14}$';
    static url = '^(https?|ftp)://[^\s/$.?#].[^\s]*$';
    static fecha = '^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/(19|20)\d{2}$';
    static entero = '[0-9]+$';
    static decimal = '[0-9.]+$';
    static enteroMayorCero = '[1-9][0-9]*$';
  }