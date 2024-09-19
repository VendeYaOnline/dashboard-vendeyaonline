export const getTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Suscripciones";

    case "/cancellations":
      return "Cancelaciones";

    case "/form":
      return "Formulario";

    case "/users":
      return "Usuarios";

    default:
      return "Suscripciones";
  }
};
