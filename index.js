const url = 'https://openapi.programming-hero.com/api/ai/tools'
const url1 = 'https://openapi.programming-hero.com/api/ai/tool/02'
const loadData = () => {
    fetch(url)
    .then(res => res.json() )
    .then(data => dataDisplay(data.data.tools))
}
const dataDisplay = (informations) =>{
    const dataConteiner = document.getElementById('card-body');
    

    const showAlls = document.getElementById('see-more');
    if(informations.length > 6){
        informations = informations.slice(0, 6);
        
        showAlls.classList.remove('d-none');
    }
    else{
        showAlls.classList.add('d-none');
    }
    // informations= informations.slice(0,6);
    informations.forEach(information => {
        console.log(information)

        const divCreat = document.createElement('div');
        divCreat.classList.add('col');
        divCreat.innerHTML = `
            <div class="card h-100">
                <img src="${information.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title fw-bold">Features</h4>
                    <p>
                    ${information.features}
                    </p>
                    <span><hr></span>
                </div>
                <div class="mx-3 pb-4 d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-column ">
                        <h4>${information.name}</h4>
                        <h5> <span><i class="fa fa-solid fa-calendar"></i></span> ${information.published_in}</h5>
                    </div>
                    <button type="button" class="card-btn btn btn-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#detailsModal">
                        <span><i class="fa fa-solid fa-arrow-right "></i></span>
                    </button>
                </div>
                
            </div>
        `;
        dataConteiner.appendChild(divCreat)
        
    });
}

// modals elements

const detailShow = id => {
   
   fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
   .then(res => res.json()) 
   .then(data => detailsDisplay(data.data))
}

const detailsDisplay = detailsInfo => {
    const modalContainer = document.getElementById('detailsModalLabel');
    console.log(detailsInfo);
    // detailsInfo.forEach(details => {})
    modalContainer.innerText = detailsInfo.tool_name
    // detailsInfo.forEach(details => {
    //     console.log(details);
        const modalDiv = document.getElementById('modal-body')
    //     modalDiv.classList.add('body-information');
        modalDiv.innerHTML = `
        <div>
        <p>hi i am done</p>
            <img src="${detailsInfo.logo}" alt="">
        </div>
        `
    
}

loadData();
detailShow();
// const processDetails = (dataLimit) => {
//     toggleSpinner(true);

//     // const searchField = document.getElementById('search-field');
//     // const searchValue = searchField.value;
//     // searchField.value = "";
//     // console.log(searchField)
//     loadPhones(informations, dataLimit)
// }


// document.getElementById('show-all-btn').addEventListener('click', function(){
//     processDetails(6);

// })
    


