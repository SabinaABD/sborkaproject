const basket = document.querySelector('#basket');
const header_basket = document.querySelector('#header_basket')
const subtotal = document.querySelector('#subtotal');
const tax = document.querySelector('#tax');
const shipping = document.querySelector('#shipping');
const total = document.querySelector('#total');

const products = [
	{
		id: 0,
		name: 'jacket',
		img: `../../../components/icon/Jacket.svg`,
		info: 'Amet minim mollit non deserunt ullamco est sit',
		price: 525,
		quantity: 1,
	},
	{
		id: 1,
		name: 'boots',
		img: `../../../components/icon/Boot.svg`,
		info: 'Amet minim mollit non',
		price: 525,
		quantity: 1,
	},
];

const selected = [...products];

function countTotal() {
	return selected.map(elem => elem.price * elem.quantity).reduce((prevCount, a) => prevCount + a, 0)
}

function itemsCount() {
	return selected.map(elem => elem.quantity).reduce((prevCount, a) => prevCount + a, 0)

}

function selectedItems() {
	selected.forEach(i => {
		basket.innerHTML += `
<div class="page__basket-list-items-item">
	<div class="page__basket-list-items-item-body">
		<div class="page__basket-list-items-item-img">
			<img src=${i.img} alt=${i.name}>
		</div>
		<div class="page__basket-list-items-item-info">
			<div class="page__basket-list-items-item-info-text">
				${i.info}
			</div>
			<div class="page__basket-list-items-item-info-count">
						<img src="../../../components/icon/Delete.svg"  alt="remove" id=${i.id} onclick="deleteItem(id)" class="page__basket-list-items-item-info-count-btn remove">
						<span id="total">${i.quantity}</span>
						<img src="../../../components/icon/Add.svg" alt="add" id=${i.id} onclick="addItem(id)" class="page__basket-list-items-item-info-count-btn add">
					<div class="page__basket-list-items-item-info-count-total">$ ${i.price * i.quantity}</div>
			</div>
		</div>
	</div>
	<div id=${i.id} class="page__basket-list-items-delete" onclick="removeFromCart(id)">
		<img src="../../../components/icon/Remove.svg" alt="delete">
	</div>
</div>
`;
	});
}

function renderBasket() {
	if (selected.length === 0) {
		basket.innerHTML = `
      <li> Ничего не добавлено <li/>
    `;
	} else {
		basket.innerHTML = '';
		selectedItems();
	}
	const count = countTotal();
	const items = itemsCount();
	subtotal.innerHTML = `$ ${count}`;
	tax.innerHTML = `$ ${count * 0.105}`;
	shipping.innerHTML = `$ ${count * 0.1}`;
	total.innerHTML = `$ ${count + (count * 0.105) + count * 0.1}`
	header_basket.innerHTML = `${items}`;
}

function removeFromCart(id) {
	const item = selected.find(it => it.id === parseInt(id));
	const index = selected.indexOf(item);
	selected.splice(index, 1);
	renderBasket();
}

function addItem(id) {
	const item = selected.find(it => it.id === parseInt(id));
	const index = selected.indexOf(item);
	selected[index].quantity = selected[index].quantity + 1;
	renderBasket();
}

function deleteItem(id) {
	const item = selected.find(it => it.id === parseInt(id));
	const index = selected.indexOf(item);
	if (selected[index].quantity > 1) {
		selected[index].quantity = selected[index].quantity - 1;
	} else {
		removeFromCart(id);
	}
	renderBasket();
}

selectedItems();
