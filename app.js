//*User Stories*//
//Backend:
  //add List item to Board.lists[]
  //replace cards.category with cards.list[]
  //updateList?
//frontend: Finish UI 
  //generateList() by board.lists[i]
  //drag and drop card from one list to the next
  //drag and drop list from one position to the next

/*GLOBALS*/
let boards = [];
let lists = [];
let cards = [];
let counter = 0; //creates unique CardID

/* CREATE NEW CARD*/
//the user clicks 'save'
function addItem(type, header, body, category){
  counter++;
  let cardID = counter;
switch (type) {
  case 'card':
    let card = {
        "id": cardID,
        "header": header,
        "body": body,
        "category": category,//will by replaced Lists[]??
        "order": "",
        "show": true//,
        //"list": list//is this needed or do I just reference in List[]?
      }
      cards.push(card);
      break;
  case 'list':
    //add a list to lists[]
    let list = {
      "id": cardID,//??
      "name": header,
      "cards": "",
      "order": "",
      "show": true
    }
    lists.push(list);
    console.log(lists);//debugger
    break;
  case 'board':
      //add a Board to boards[]
      let board = {
        "id": cardID,//??
        "name": header,
        "lists": "",
        "show": true
      }
      boards.push(board);
      console.log(boards);//debugger
      break;
  default:
  console.log('Couldnt execute addFunction()');
}

  generateList();
}

/*DELETE CARD*/
//the system sets record show status to false
function deleteCard(cardID){
  for(let i = 0; i<cards.length; i++){
    if(cards[i].id==cardID){
      cards[i].show = false;
    }
  }
//the system updates user view to reflect deleted record
  generateList();
}


/*UPDATE CARD*/
//the user clicks 'edit' to update card
function getCard(cardID){
    let card;
  for(let i=0; i<cards.length; i++){
    if(cards[i].id == cardID){
      card = {
          "id": cardID,
          "header": cards[i].header,
          "body": cards[i].body,
          "category": cards[i].category
        }
    }
  }
  return editCard(card);
}

//the system updates card in data storage but does not create new card
function updateCard(cardID, header, body, category){
  for(let i = 0; i<cards.length; i++){
    if(cards[i].id==cardID){
      //update record
      cards[i].header = header;
      cards[i].body = body;
      cards[i].category = category;
    }
  }
  generateList();
}

/*VIEWS*/
//clears DOM
function clearBox(){
  let tag = document.getElementById('container');
    while(tag.firstChild){
      tag.removeChild(tag.firstChild);
    }
}

//the app returns empty form fields
function createCardForm(){
  let c = document.createElement('form');
      c.setAttribute('id', 'cardform');
    //  c.setAttribute('class', 'form-group')
      c.setAttribute('method', 'post');
      c.setAttribute('onSubmit', 'saveCard()');

  let h = document.createElement('input');
      h.setAttribute('class', 'form-control');
      h.type = 'text';
      h.name = 'header';
      h.id = 'header';
  let b = document.createElement('input');
      b.setAttribute('class', 'form-control');
      b.type = 'text';
      b.name = 'body';
      b.id = 'body';
//Category selector
  let cat = document.createElement('select');
      cat.setAttribute('class', 'custom-select');
      cat.name = 'category';
      cat.id = 'category';
      for(let i = 0; i<lists.length; i++){
        let opt = document.createElement('option');
            opt.value = lists[i].name;
            opt.text = lists[i].name;
            cat.appendChild(opt);
      }

  let s = document.createElement('input');
      s.setAttribute('class', 'btn btn-success');
      s.type = 'button';
      s.id = 'save';
      s.value = 'Save';

      c.appendChild(h);
      c.appendChild(b);
      c.appendChild(cat);
      c.appendChild(s);

  let cont = document.getElementById('container');
      clearBox();
      cont.appendChild(c);
      document.body.appendChild(cont);
}

//the system returns editable forms with card values prepopulated
function editCard(card){
  let newCard = card;

  let div = document.createElement('div');
      div.id = 'cardID';
      div.value = newCard.id;
  let c = document.createElement('form');
      c.setAttribute('id', 'cardform');
      c.setAttribute('method', 'post');
  let h = document.createElement('input');
      h.type = 'text';
      h.name = 'header';
      h.id = 'header';
      h.value = newCard.header;
  let b = document.createElement('input');
      b.type = 'text';
      b.name = 'body';
      b.id = 'body';
      b.value = newCard.body;
//Category selector
  let cat = document.createElement('select');
      cat.name = 'category';
      cat.id = 'category';
      for(let i = 0; i<lists.length; i++){
        let opt = document.createElement('option');
            opt.value = lists[i].name;
            opt.text = lists[i].name;
            cat.appendChild(opt);
      }

  let s = document.createElement('input');
      s.type = 'button';
      s.id = 'update';
      s.value = 'Update';

      c.appendChild(div);
      c.appendChild(h);
      c.appendChild(b);
      c.appendChild(cat);
      c.appendChild(s);
  let cont = document.getElementById('container');
      clearBox();
      cont.appendChild(c);
}

//default card list view
function generateList(){
  let div = document.createElement('div');
          div.setAttribute('class', 'card');

  let listDiv = document.createElement('div');
          //ul.setAttribute('class', 'card-header');

  for(let i = 0; i<cards.length; i++){
    if(cards[i].show){
      let cardDiv = document.createElement('div');
          cardDiv.id = cards[i].id;
          cardDiv.value = cards[i].id;
          cardDiv.innerHTML =
          "<div class='card-header'>"+cards[i].header+
          "</div><blockquote class='card-blockquote'><div class='card-body'>"
          +cards[i].body+"</div></blockquote>";

      //DELETE BUTTON
      let d = document.createElement('input');
          d.setAttribute('class', 'btn btn-success');
          d.type = 'button';
          d.id = 'delete';
          //d.value = 'Delete';
          d.value = cards[i].id;
          cardDiv.appendChild(d);
          listDiv.appendChild(cardDiv);
          div.appendChild(listDiv);
      }
  }
  let cont = document.getElementById('container');
      clearBox();
      cont.appendChild(div);
}

/*List views*/
function createListForm(){
  let c = document.createElement('form');
      c.setAttribute('id', 'listform');
      c.setAttribute('method', 'post');
    //  c.setAttribute('onSubmit', 'saveCard()');

  let h = document.createElement('input');
      h.type = 'text';
      h.name = 'header';
      h.id = 'header';

  let s = document.createElement('input');
      s.type = 'button';
      s.id = 'saveList';
      s.value = 'Save';

      c.appendChild(h);
      c.appendChild(s);

  let cont = document.getElementById('container');
      clearBox();
      cont.appendChild(c);
      document.body.appendChild(cont);
}

/*Board Form*/
function createBoardForm(){
  let c = document.createElement('form');
      c.setAttribute('id', 'boardform');
      c.setAttribute('method', 'post');
    //  c.setAttribute('onSubmit', 'saveCard()');

  let h = document.createElement('input');
      h.type = 'text';
      h.name = 'header';
      h.id = 'header';

  let s = document.createElement('input');
      s.type = 'button';
      s.id = 'saveBoard';
      s.value = 'Save';

      c.appendChild(h);
      c.appendChild(s);

  let cont = document.getElementById('container');
      clearBox();
      cont.appendChild(c);
      document.body.appendChild(cont);
}

/*CONTROLLERS*/
      document.body.addEventListener( 'click', function (event) {

        if( event.srcElement.id == 'save' ) {
          addItem('card',
                            document.getElementById('header').value,
                            document.getElementById('body').value,
                            document.getElementById('category').value
                          );
        };
        if( event.srcElement.id == 'update' ) {
          updateCard(
                            document.getElementById('cardID').value,
                            document.getElementById('header').value,
                            document.getElementById('body').value,
                            document.getElementById('category').value
                          );
        };
        if( event.srcElement.id == 'delete' ) {
          deleteCard(
                            document.getElementById('delete').value
                          );
        };
        if( event.srcElement.id == 'saveList' ) {
          addItem('list',
                            document.getElementById('header').value,
                          );
        };
        if( event.srcElement.id == 'saveBoard' ) {
          addItem('board',
                            document.getElementById('header').value,
                          );
        };
      } );
