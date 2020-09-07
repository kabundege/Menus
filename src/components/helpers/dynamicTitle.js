export default () => {
    const value = window.location.pathname;
    let search = window.location.search;
    let final;
    if(value){
        const newValue =  value.split("");
        const path = newValue.splice(1).join("");
        final = path;
    }
    if(search !== ''){
        search = search.split("");
        const newValue = search.splice(10);
        const foodType = newValue.join("");

        final += ` ◽ ${foodType}`;
    }
    document.title = final 
}