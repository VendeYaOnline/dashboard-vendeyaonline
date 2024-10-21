export const formatDateText = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

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

export const convertDate = (dateString: string) => {
  const [day, month, year] = dateString.split("-");
  const dateFormat = `${year}-${month}-${day}T00:00:00`;
  return dateFormat;
};
