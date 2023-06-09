const url = 'https://openapi.programming-hero.com/api/ai/tools';
const loadData = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dataDisplay(data.data.tools.slice(0, 6));
      // sortByDate(data.data.tools.slice(0, 6));
    });
};

// show all data
const showAlls = () => {
  console.log('showAlls');
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dataDisplay(data.data.tools);
    });
};

// let sixItem = [];
// let allItem = [];
// // sort by date
// const sortByDate = () => {
//   if (sixItem[0].length === 6 && allItem.length === 0) {
//     console.log('sixItem :>> ', sixItem);
//     // console.log('...sixItem[0] :>> ', [...sixItem[0]]);
//     const sortDataByDate = [...sixItem[0]].sort(
//       (a, b) => new Date(b.published_in) - new Date(a.published_in)
//     );
//     console.log('sortDataByDate :>> ', sortDataByDate);
//     dataDisplay(sortDataByDate);
//   } else {
//     console.log('allItem :>> ', allItem);
//     const sortDataByDate = [...allItem[0]].sort(
//       (a, b) => new Date(b.published_in) - new Date(a.published_in)
//     );
//     console.log('sortDataByDate :>> ', sortDataByDate);

//     dataDisplay(sortDataByDate);
//   }
// };

let sixItem = [];
let allItem = [];

// sort by date
const sortByDate = () => {
  const dataToSort =
    sixItem.length > 0 && allItem.length === 0 ? sixItem[0] : allItem[0];
  const sortDataByDate = [...dataToSort].sort(
    (a, b) => new Date(b.published_in) - new Date(a.published_in)
  );
  dataDisplay(sortDataByDate);
};

const dataDisplay = (data) => {
  // console.log('data :>> ', data);
  // if (data.length === 6) {
  //   sixItem.length === 0 && sixItem.push(data);
  // } else {
  //   allItem.length === 0 && allItem.push(data);
  // }

  if (data.length === 6) {
    sixItem = [data];
  } else {
    allItem = [data];
  }

  document.getElementById('card_body').innerHTML = '';
  let ol_id = 0;
  data.forEach((element) => {
    // console.log(element);
    document.getElementById('card_body').innerHTML += `
    <div >
                <div class=" shadow rounded bg-primary-subtle h-100" >
                <div class="d-flex justify-content-center pt-4 px-4" >
                <img  src="${
                  element.image
                }" class=" img-fluid rounded " style="width: 300px;"/>
                </div>
                <div class="p-4">
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
  // console.log(data);
  document.getElementById('modal_body').innerHTML = `
<div class="position-absolute top-0 start-100 translate-middle">
<button type="button" class="btn-close d-inline bg-primary rounded-pill p-3"
    data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class=" p-5 d-flex flex-column flex-xl-row gap-xl-5 gap-3 justify-content-between align-items-center ">


<div class="rounded  p-3" style="background-color: #EB57570D;">
    <h3 class="fw-bold"> ${data.description} </h3>
    
    <div class=" d-flex gap-3 mt-3 fw-bold">
    <div class="bg-warning rounded text-center text-wrap  p-4" > ${
      data.pricing
        ? data.pricing[0].price + '\n' + data.pricing[0].plan
        : 'Free of Cost/Basic'
    } </div>
    <div class="bg-warning rounded text-center text-wrap  p-4"> ${
      data.pricing
        ? data.pricing[1].price + '\n' + data.pricing[1].plan
        : 'Free Of Cost/Pro'
    } </div>
    <div class="bg-warning rounded text-center text-wrap  p-4"> ${
      data.pricing
        ? data.pricing[2].price + '\n' + data.pricing[2].plan
        : 'Free of Cost /Enterprise'
    } </div>
    </div>
    
    <div class=" d-flex justify-content-between mt-3">
        <div class="">
            <h5>Features</h5>
            <ul id="modal_features">
         
            </ul>
        </div>
        <div class="">
            <h5>Integrations</h5>
            <ul id="modal_integrations">
               
            </ul>
        </div>

    </div>
</div>
<!-- modal right content -->
<div class="order-0 order-xl-1 p-3 border rounded">
    <div>
              <div>
               
                <div class="position-relative">
                <button id="modal_accuracy" class="btn btn-primary mt-3 me-3 position-absolute top-0 end-0">${
                  data.accuracy.score
                    ? data.accuracy.score + '%' + ' accuracy'
                    : 'not found'
                }
                   </button>
                   <img class="img-fluid"  src="${data.image_link[0]}" />
            </div>

                
              </div>



        <div class="text-center mt-3">
            <h5 class="fw-bold">${
              data.input_output_examples
                ? data.input_output_examples[0].input
                : 'not found'
            }</h5>

            <p>${
              data.input_output_examples
                ? data.input_output_examples[0].output
                : 'not found'
            }</p>
        </div>
    </div>
</div>
</div>


`;
  const { features, integrations } = data;
  console.log(data);
  // Modal features
  const modal_features = document.getElementById('modal_features');
  // console.log(modal_data.features);
  const features_data_arr = Object.values(features);
  // console.log(features_data_arr[0]);

  features_data_arr.forEach((ele) => {
    // console.log(ele);
    if (ele.feature_name) {
      const li = document.createElement('li');
      li.innerText = ele.feature_name;
      modal_features.appendChild(li);
    } else {
      const li = document.createElement('li');
      li.innerText = 'not found';
      modal_features.appendChild(li);
    }
  });

  console.log(integrations);
  // Modal integrations
  const modal_integrations = document.getElementById('modal_integrations');
  if (integrations) {
    integrations.forEach((ele) => {
      const li = document.createElement('li');
      li.innerText = ele;
      modal_integrations.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.innerText = 'not found';
    modal_integrations.appendChild(li);
  }
};
loadData();
// console.log('allItem :>> ', allItem);
// console.log('sixItem :>> ', sixItem);
