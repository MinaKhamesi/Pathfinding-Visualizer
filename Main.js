import Table from './TableClass.js';



//------------------------------------------------------
//         Handling mouse functions (Start, end, wall, weight)
//------------------------------------------------------
var mouseValue = 'wall';
var mouseIsPressed = false;
var weightIsSelected = false;

var diagonalAllowed = false;
var universalGrid = false;




    const cells1 = document.querySelectorAll(`#table-1 .row span`);
    const cells2 = document.querySelectorAll(`#table-2 .row span`);
    const cells3 = document.querySelectorAll(`#table-3 .row span`);
    const cells4 = document.querySelectorAll(`#table-4 .row span`);
    const allCells = [cells1, cells2, cells3, cells4];

    allCells.forEach((cells,idx)=>cells.forEach((cell,index)=>{

        cell.addEventListener('mousedown',(e)=>{
            mouseIsPressed = true;
            if(e.target.classList.contains('start')){
                mouseValue='start'
            }else if(e.target.classList.contains('end')){
                mouseValue='end'
            }else if(e.target.classList.contains(mouseValue)){
                e.target.classList.remove(mouseValue);
                if(universalGrid){
                    for(let table=0;table<allCells.length;table++){
                        if(table==idx) continue;
                        for(let ele=0;ele<allCells[table].length;ele++){
                            if(ele===index){
                                allCells[table][ele].classList.remove(mouseValue)
                            }
                        }
                    }
                }
                
            }else{
                e.target.classList.add(mouseValue)
                if(universalGrid){
                    for(let table=0;table<allCells.length;table++){
                        if(table==idx) continue;
                        for(let ele=0;ele<allCells[table].length;ele++){
                            if(ele===index){
                                allCells[table][ele].classList.add(mouseValue)
                            }
                        }
                    }
                }
                
            }
        })


        cell.addEventListener('mouseover',(e)=>{
            if (e.target.classList.contains('start') || e.target.classList.contains('end')){
                return}
            if(mouseIsPressed && mouseValue!=='wall' && mouseValue!='weight'){
                cell.className = mouseValue;
                if(universalGrid){
                    for(let table=0;table<allCells.length;table++){
                        for(let ele=0;ele<allCells[table].length;ele++){
                            if(ele===index){
                                allCells[table][ele].className = mouseValue;
                            }
                        }
                    }
                }
                

            }else if(mouseIsPressed){
                if (!e.target.classList.contains(mouseValue)){
                    e.target.className = mouseValue;
                    if(universalGrid){
                        for(let table=0;table<allCells.length;table++){
                            for(let ele=0;ele<allCells[table].length;ele++){
                                if(ele===index){
                                    allCells[table][ele].className = mouseValue;
                                }
                            }
                        }
                    }
                    
                }else{
                    e.target.classList.remove(mouseValue)
                    if(universalGrid){
                        for(let table=0;table<allCells.length;table++){
                            if(table==idx) continue;
                            for(let ele=0;ele<allCells[table].length;ele++){
                                if(ele===index){
                                    allCells[table][ele].classList.remove(mouseValue)
                                }
                            }
                        }
                    }
                    
                }
            }
        });


        cell.addEventListener('mouseleave',(e)=>{
            if(mouseIsPressed && mouseValue!='wall' && mouseValue!='weight'){
                cell.classList.remove(mouseValue);
                if(universalGrid){
                    for(let table=0;table<allCells.length;table++){
                        for(let ele=0;ele<allCells[table].length;ele++){
                            if(table==idx) continue;
                            if(ele===index){
                                allCells[table][ele].classList.remove(mouseValue);
                            }
                        }
                    }
                }
                
            }
    })


    cell.addEventListener('mouseup',(e)=>{
        
        mouseIsPressed = false;
        //check for weight 
        if(weightIsSelected){
            mouseValue = 'weight'
        }else{
            mouseValue = 'wall'
        }
})



    }));


    const table1Element = document.getElementById('table-1');
    const table2Element = document.getElementById('table-2');
    const table3Element = document.getElementById('table-3');
    const table4Element = document.getElementById('table-4');

    const tableElements = [table1Element, table2Element, table3Element, table4Element];

    tableElements.forEach((table,idx)=>{
        table.addEventListener('mouseleave',(e)=>{
            if(mouseIsPressed && mouseValue=='start'){
                document.querySelector(`#${table.id} #start`).className='start';
                if(universalGrid){
                    for(let i=0;i<tableElements.length;i++){
                        if(i==idx) continue;
                        document.querySelector(`#${tableElements[i].id} #start`).className='start';
                    }
                }
                
                
            }else if(mouseIsPressed && mouseValue=='end'){
                document.querySelector(`#${table.id} #end`).className='end';
                if(universalGrid){
                    for(let i=0;i<tableElements.length;i++){
                        if(i==idx) continue;
                        document.querySelector(`#${tableElements[i].id} #end`).className='end';
                    }
                }
                
            }
            mouseIsPressed=false;
            if(weightIsSelected){
                mouseValue='weight'
            }else{
                mouseValue='wall'
            }
        })
    
        table.addEventListener('mouseup',()=>{
            mouseIsPressed = false;
            if(weightIsSelected){
                mouseValue='weight';
            }else{
                mouseValue = 'wall';
            }
        })
    })
    




//---------------------------------------------------------
//           Handling checkboxes in controlPanel
//---------------------------------------------------------

const algoToggle = document.getElementById('algo-toggle')
const mazeToggle = document.getElementById('maze-toggle')
const optionToggle = document.getElementById('option-toggle');
algoToggle.addEventListener('change',()=>{
     if(algoToggle.checked){
        mazeToggle.checked = false;
        optionToggle.checked = false;
     }
})
mazeToggle.addEventListener('change',()=>{
    if(mazeToggle.checked){
       algoToggle.checked = false;
       optionToggle.checked = false;
    }
})
optionToggle.addEventListener('change',()=>{
    if(optionToggle.checked){
       mazeToggle.checked = false;
       algoToggle.checked = false;
    }
})



//------------------------------------------------------------------
//      Declaring Tables and Selecting and assigning algorithms
//------------------------------------------------------------------

const table1 = new Table('table-1',true);
const table2 = new Table('table-2');
const table3 = new Table('table-3');
const table4 = new Table('table-4');



var tables = [table1,table2,table3,table4]

//--------------------------------------------------------------------
//                  Graph Algorithm Selection
//--------------------------------------------------------------------
const algosBtns = document.querySelectorAll(`.control-item:first-child ul input[type='checkbox']`)

algosBtns.forEach(btn=>{
    btn.addEventListener('change',(e)=>{

        //#00 if number of selected is 4 make all others disable
        if(document.querySelectorAll(`.control-item:nth-child(1) ul input[type='checkbox']:checked`).length===4){
            document.querySelectorAll(`.control-item:nth-child(1) ul input[type='checkbox']:not(:checked)`).forEach(checkbox=>checkbox.disabled = true)
        }
        
        if(e.target.checked){

            //#1 if there is any active table with no graphAlgo add it to it
            for(let i=0;i<tables.length;i++){
                if(tables[i].active && tables[i].graphAlgo==null){
                    tables[i].graphAlgo = e.target.name;
                    tables[i].updateTitle();
                    return
                }
            }

            //#2 if there was no such table. activate a new one and add the algo to it
            for(let i =0;i<tables.length;i++){
                if(!tables[i].active){
                    tables[i].graphAlgo = e.target.name;
                    tables[i].activate()
                    break;
                }
            }

            //#2-1 if we are activating just 2 tables edit container
            let tablesActive = 0;
            for(let i=0;i<tables.length;i++){
                if(tables[i].active)  tablesActive += 1;
            }
            if(tablesActive==2){
                document.querySelector('.container').classList.add('multiple');
            }
            if(tablesActive<=4){
                return
            } 
            //#3 if there was not any graph with no graphAlgo..alert.at most four graph at a time
            alert('at most 4 graph at a time'); 

            

        }else{
            //#00 if there are any disabled checkbox make them abled:D
            if(document.querySelectorAll(`.control-item:nth-child(1) > ul input[type="checkbox"]:disabled`).length>0){
                console.log('there is a disabled checkbock')
                document.querySelectorAll(`.control-item:nth-child(1) > ul input[type="checkbox"]:disabled`).forEach(checkbox=>checkbox.disabled = false)
            }

            //#1 if there is an active table with that algo deactivate table(remove)
            for(let i=0; i<tables.length;i++){

                if(tables[i].graphAlgo===e.target.name){

                    //unselect the associated mazeAlgos for ui.
                    const mazeAlgoToUnselect = tables[i].mazeAlgo;
                    if(mazeAlgoToUnselect){
                        document.querySelector(`.control-item:nth-child(2) ul input[name='${mazeAlgoToUnselect}']`).checked = false;
                    }


                    tables[i].deactivate();

                    

                    //#1-1 if the number of tables after removing is one edit container
                    let activeCount = 0
                    for(let i=0;i<tables.length;i++){
                        if(tables[i].active) activeCount+=1
                    }


                    if(activeCount===1){
                        document.querySelector('.container').classList.remove('multiple');
                    }

                    //#1-2 if we deactivate all tables activate one
                    if(activeCount===0){
                        tables[0].activate()
                        }

                    return;
                }

                
            }
            

            //#2 if it is not alert this algo was not been selected
            alert('the algorithm has not been selected before');

        }
    })
})



//----------------------------------------------------------------------
//         Maze Generation Algorithm selection
//----------------------------------------------------------------------

const mazeBtns = document.querySelectorAll(`.control-item:nth-child(2) ul input[type='checkbox']`)

mazeBtns.forEach(btn=>{
    btn.addEventListener('change',(e)=>{
        if(e.target.checked){

            //#00 if number of selected is 4 make all others disable
            if(document.querySelectorAll(`.control-item:nth-child(2) ul input[type='checkbox']:checked`).length===4){
                document.querySelectorAll(`.control-item:nth-child(2) ul input[type='checkbox']:not(:checked)`).forEach(checkbox=>checkbox.disabled = true)
            }

            //#1 if there is an active table add mazeAlgo to that table
            for(let i =0; i<tables.length;i++){
                if(tables[i].active && tables[i].mazeAlgo==null){
                    tables[i].mazeAlgo = e.target.name;
                    tables[i].updateTitle();
                    return
                }
            }

            //#2 if there was not any active table we should active a new table and add mazeAlgo to that table.
            for(let i=0; i<tables.length; i++){
                if(!tables[i].active){
                    tables[i].mazeAlgo = e.target.name;

                    tables[i].activate();

                    //if we have 2 tables active edit container
                    let count=0
                    for(let i=0;i<tables.length;i++){
                        if (tables[i].active) count += 1
                    }
                    if (count===2){
                        document.querySelector('.container').classList.add('multiple');
                    }
                    return
                }
            }

            //#3 if all tables are active and none has place for maze Algo

            console.log('at most four maze can be compared at a time')
        }else{

            //####   if its being unselected we want to remove the maze
            // we go through tables and find the one with mazeAlgo
            for(let i=0; i<tables.length; i++){
                if(tables[i].active && tables[i].mazeAlgo===e.target.name){

                    //#00 if there are any disabled checkbox make them abled:D
                    if(document.querySelectorAll(`.control-item:nth-child(2) > ul input[type="checkbox"]:disabled`).length>0){
                        
                        document.querySelectorAll(`.control-item:nth-child(2) > ul input[type="checkbox"]:disabled`).forEach(checkbox=>checkbox.disabled = false);

                    }


                    //#1 if table doesn't have a graph algo eighther we deactivate it
                    if(tables[i].graphAlgo===null){

                        tables[i].deactivate();


                        //if we have just one table edit container
                        let countActive=0
                        for(let i=0;i<tables.length;i++){
                            if(tables[i].active) countActive+=1
                        } 
                        if(countActive===1){
                            document.querySelector('.container').classList.remove('multiple');
                        }


                        //if we removed all tables we wanna activate one of them:
                        for(let i=0;i<tables.length;i++){
                            if(tables[i].active) return;
                        }
                        tables[0].activate();
                        return;



                    }

                    //#2  if it has a graph we just remove its mazeAlgo
                    tables[i].mazeAlgo = null;
                    tables[i].updateTitle();  


                    
                    return;
                }
            }

            //if we haven't find the mazeAlgo in tables
            console.log('maze was not selected before');
        }
    })
})



//------------------------------------------------------------------
//               Options selection
//------------------------------------------------------------------

const allowDiagonalBtn = document.getElementById('diagonal');

allowDiagonalBtn.addEventListener('change',(e)=>{
    diagonalAllowed = e.target.checked ? true : false;
})



const weightBtn = document.getElementById('weight');

weightBtn.addEventListener('change',(e)=>{
    weightIsSelected = e.target.checked ? true : false;
    if (e.target.checked){
        document.getElementById('panel-toggle').checked = false;
    }
    mouseValue = e.target.checked ? 'weight' : 'wall';
});


//--------Clean Tables Buttons--------

const cleanBtns = document.querySelectorAll(`.table > i`);

cleanBtns.forEach(btn=>{

    btn.onclick = (e)=>{
        if(universalGrid){
            tables.forEach(table=>table.active && table.cleanGrid());
            return;
        }
        tables.forEach(table=>table.id===e.target.parentElement.id && table.cleanGrid())
    }

    btn.ondblclick = (e)=>{
        if(universalGrid){
            tables.forEach(table=> table.active && table.resetBoard());
            return;
        }
        tables.forEach(table=>table.id===e.target.parentElement.id && table.resetBoard())
    }

})

//------------------------------------------
//    range selection for animation speed
//-----------------------------------------

//#1 show the value of range in the span
//#2 set global variables for speed

var mazeSpeed;

const mazeAnimationBtn = document.getElementById('mazeSpeed');

document.querySelector('#mazeSpeed + span').innerHTML = mazeAnimationBtn.value;
mazeSpeed = mazeAnimationBtn.value


mazeAnimationBtn.addEventListener('input',e=>{
    document.querySelector('#mazeSpeed + span').innerHTML =mazeAnimationBtn.value;
    mazeSpeed = mazeAnimationBtn.value;
});


var graphSpeed;

const graphAnimationBtn = document.getElementById('graphSpeed');

document.querySelector('#graphSpeed + span').innerHTML = graphAnimationBtn.value;
graphSpeed = graphAnimationBtn.value;

graphAnimationBtn.oninput = function() {
    document.querySelector('#graphSpeed + span').innerHTML = this.value;
    graphSpeed = graphAnimationBtn.value;
  }

//----------------------
// selecting manhattan distance
//---------------------

var manhattanDist = false;

const manhattanBtn = document.getElementById('manhattan')
manhattanBtn.addEventListener('click',(e)=>{
    manhattanDist = (e.target.checked) ? true : false;
    
})

//-----------------------------------
//   setting universal grid for all tables
//----------------------------------

const uniGridBtn = document.getElementById('uniGrid');

uniGridBtn.addEventListener('click',e=>{
    universalGrid = e.target.checked ? true : false;
    if(universalGrid){
        for(let i=0;i<tables.length;i++){
            if(tables[i].active){
                tables[i].resetBoard();
            }
        }
    }
    });



const updateHTML = (table,grid=null)=>{
    const currentGrid = document.querySelector(`#${table.id} .grid`);
    currentGrid.innerHTML = '';
    if(grid){
        for(let row=0;row<grid.length;row++){

            const currentRow = document.createElement('div');
            currentRow.className = 'row';
           
            for(let col=0;col<grid[0].length;col++){
                let currentElement = grid[row][col];
                console.log(currentElement);
                currentRow.innerHTML = grid[row][col]
            }

            currentGrid.appendChild(currentRow)
        }
    }else{
        for(let row=0;row<30;row++){
            const currentRow = document.createElement('div');
            currentRow.className = 'row';
            for(let col=0;col<60;col++){
                const currentCol = document.createElement('span');
                currentRow.appendChild(currentCol);
            }
            currentGrid.appendChild(currentRow)
        }
    }
}





//-------------------------------------------------------------
//             Visualize Btn
//-------------------------------------------------------------
const visBtn = document.getElementById('visBtn')

visBtn.addEventListener('click',()=>{

    const algos = document.querySelectorAll(`.control-item > ul input:checked`);
    if(algos.length===0){
        showMessage('please select an algorithm to visualize.')
        return
    }

    document.getElementById("panel-toggle").checked = false;
    

    for(let i=0;i<tables.length;i++){
        if(tables[i].active){
            tables[i].cleanGrid();
            tables[i].runAlgo(diagonalAllowed,mazeSpeed,graphSpeed,manhattanDist);
        }
       
    }


})

const showMessage = (msg) =>{
    document.querySelector('.alert').innerText = msg;
    document.querySelector('.alert').classList.add('active');
    setTimeout(()=>{
        document.querySelector('.alert').classList.remove('active');
    }, 5000)
   
}

