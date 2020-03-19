import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IBook {
    id : Number;
    title : String;
    author : String;
    publisher : String;
    price: Number;
}

let baseUri: string ="http://anbo-bookstorerest.azurewebsites.net/api/Books"
let outputElement : HTMLDivElement= <HTMLDivElement> document.getElementById("output");
let buttonElement : HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");
buttonElement.addEventListener("click",ShowBooks);

function ShowBooks(): void {
    axios.get<IBook[]>(baseUri)
    .then(function(response: AxiosResponse<IBook[]>): void {
        let result: string ="<ul id='booklist' class='list-group' >";
        response.data.forEach((book: IBook) => {
            result += "<li style='margin: 10px; background: lightgrey;' class='list-group-item'>" + book.id + " " + book.title + " " +  book.author + " " + book.publisher + " " + book.price + "</li>";
        });
        result += "</ul>";
        outputElement.innerHTML = result;
    })

    .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
        if (error.response) {
            // the request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
            outputElement.innerHTML = error.message;
        } else { // something went wrong in the .then block?
            outputElement.innerHTML = error.message;
        }
    });

}