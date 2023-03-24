const url = 'https://openapi.programming-hero.com/api/ai/tools';
const loadData = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => dataDisplay(data.data.tools));
};
const dataDisplay = (data) => {
  //   const showAlls = document.getElementById('see-more');
  //   if (data.length > 6) {
  //     data = data.slice(0, 6);

  //     showAlls.classList.remove('d-none');
  //   } else {
  //     showAlls.classList.add('d-none');
  //   }
  // data= data.slice(0,6);

  //   console.log(data);
  let ol_id = 0;
  data.forEach((element) => {
    // console.log(element);
    document.getElementById('card_body').innerHTML += `
    <div >
                <div class=" shadow rounded">
                <div class="p-4">
                <img src="${element.image}" class="img-fluid rounded"/>
                    <h5 class="mt-3">Features</h5>
                    <ol id="ol_id_${ol_id++}" >
        
                    </ol>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4>${element.name}</h4>
                            <p>${element.published_in}</p>
                        </div>
                        <div>
                            <button onclick="getModalData('${
                              element.id
                            }')" type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                <span><i class="fa fa-solid fa-arrow-right"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
                `;
  });
  featuresList(data);
};
const featuresList = (data) => {
  let ol_id = 0;
  data.forEach((element) => {
    const ol = document.getElementById('ol_id_' + ol_id++);
    element.features.forEach((ele) => {
      const li = document.createElement('li');
      li.innerHTML = ele;
      ol.appendChild(li);
    });
  });
};

// modal

const getModalData = (id) => {
  const modalURL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(modalURL)
    .then((res) => res.json())
    .then((modalData) => {
      showModaldata(modalData.data);
    });
};

const showModaldata = (data) => {
  console.log(data);
  document.getElementById('modal_body').innerHTML += `
<div class="position-absolute top-0 start-100 translate-middle">
<button type="button" class="btn-close d-inline bg-primary rounded-pill p-3"
    data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div
class=" p-5 d-flex flex-column flex-xl-row gap-xl-5 gap-3 justify-content-between align-items-center ">
<!-- modal left content -->
<div class="rounded order-1 order-xl-0 p-3" style="background-color: #EB57570D;">
    <h3 class="fw-bold">
        ChatGPT is an AI-powered chatbot platform that uses OpenAI's GPT
        technology to simulate human conversation.
    </h3>
    <!-- price -->
    <div class=" d-flex gap-3 mt-3 fw-bold">
        <div class="bg-warning rounded p-3">$10/month Basic</div>
        <div class="bg-warning rounded p-3">$50/month Pro</div>
        <div class="bg-warning rounded p-3">Contact us Enterprise</div>
    </div>
    <!-- features and Integrations -->
    <div class=" d-flex justify-content-between mt-3">
        <div class="">
            <h5>Features</h5>
            <ul>
                <li>Customizable responses</li>
                <li>Multilingual support</li>
                <li>Seamless integration</li>
            </ul>
        </div>
        <div class="">
            <h5>Integrations</h5>
            <ul>
                <li>FB Messenger</li>
                <li>Slack</li>
                <li>Telegram</li>
            </ul>
        </div>

    </div>
</div>
<!-- modal right content -->
<div class="order-0 order-xl-1 p-3 border rounded">
    <div>
        <img  class="img-fluid rounded"
            src="${data.image_link}" />
        <div class="text-center mt-3">
            <h5 class="fw-bold">Hi, how are you doing today?</h5>

            <p>I'm doing well, thank you for asking. How can I assist you today?</p>
        </div>
    </div>
</div>
</div>


`;
};

loadData();

// detailShow();

// modals elements

// const detailShow = (id) => {
//   fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
//     .then((res) => res.json())
//     .then((data) => detailsDisplay(data.data));
// };

// const detailsDisplay = (detailsInfo) => {
//   const modalContainer = document.getElementById('detailsModalLabel');
//   console.log(detailsInfo);
//   // detailsInfo.forEach(details => {})
//   modalContainer.innerText = detailsInfo.tool_name;
//   // detailsInfo.forEach(details => {
//   //     console.log(details);
//   const modalDiv = document.getElementById('modal-body');
//   //     modalDiv.classList.add('body-information');
//   modalDiv.innerHTML = `
//         <div>
//         <p>hi i am done</p>
//             <img src="${detailsInfo.logo}" alt="">
//         </div>
//         `;
// };

// const processDetails = (dataLimit) => {
//     toggleSpinner(true);

//     // const searchField = document.getElementById('search-field');
//     // const searchValue = searchField.value;
//     // searchField.value = "";
//     // console.log(searchField)
//     loadPhones(data, dataLimit)
// }

// document.getElementById('show-all-btn').addEventListener('click', function(){
//     processDetails(6);

// })
