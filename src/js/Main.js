import css from '../css/style.css';
import Table from './TableClass.js';

//---------------------------------------------------------
//          Instruction GuildLines
//---------------------------------------------------------
var instructionInProgress
setTimeout(()=>{
    instructionInProgress = true;
document.querySelector('.instruction-start').classList.remove('hidden');},700);

// making first guild disappear is taking care of by clicking on menu.I wrote it on toturial section.

let allInstructionsNext = document.querySelectorAll('.instruction .next');
allInstructionsNext.forEach(nextBtn=>{
    nextBtn.onclick = function(e){
        let parent = e.target.parentElement.parentElement;
        parent.classList.add('hidden');
        let nextGuild = parent.nextElementSibling;
        nextGuild.classList.remove('hidden');
        //if it is algo or option or vis make sure control-panel is open
        if (nextGuild.classList.contains('instruction-algos') ||nextGuild.classList.contains('instruction-options') || nextGuild.classList.contains('instruction-visBtn')){
            let controlPanelBtn = document.getElementById('panel-toggle');
            if(!controlPanelBtn.checked) controlPanelBtn.checked = true;
        }
        // if it is title make sure panel is closed
        if (nextGuild.classList.contains('instruction-table-title')){
            let controlPanelBtn = document.getElementById('panel-toggle');
            if(controlPanelBtn.checked) controlPanelBtn.checked = false;
        }
        //if it is option make sure maze and algo are closed
        if (nextGuild.classList.contains('instruction-options')){
            let algoMenu = document.getElementById('algo-toggle');
            if(algoMenu.checked) algoMenu.checked = false;
            let mazeMenu = document.getElementById('maze-toggle');
            if(mazeMenu.checked) mazeMenu.checked = false;
        }
        //if it is end make info icon noticeable
        if (nextGuild.classList.contains('instruction-end')){
            document.querySelector('.title  .fa-info-circle').classList.add('noticeable');
        }
    }
});


let allSkipBtns = document.querySelectorAll('.instruction .skip');
allSkipBtns.forEach(btn=>{
    btn.onclick = function(e){
        //#1 make all instructions disappear
        let allInstructions = document.querySelectorAll('.instruction');

        allInstructions.forEach(massage=>{
            if(!massage.classList.contains('hidden')){
                massage.classList.add('hidden');
            }
        })

        //#2 change instructionInProgress to false
        instructionInProgress = false;

        //#3 if info icon is noticeable make it normal
        if(document.querySelector('.title .fa-info-circle').classList.contains('noticeable')){
            document.querySelector('.title .fa-info-circle').classList.remove('noticeable')
        }
    }
})

//when clicking on info button instruction starts again
let infoBtn = document.querySelector('.title i.fa-info-circle');
infoBtn.onclick = function(e){
    if(instructionInProgress){
        instructionInProgress = false;
        // make all instructions disappear
        let allInstructions = document.querySelectorAll('.instruction');

        allInstructions.forEach(massage=>{
            if(!massage.classList.contains('hidden')){
                massage.classList.add('hidden');
            }
        })
        //if info icon is noticeable make it normal
        if(document.querySelector('.title i.fa-info-circle').classList.contains('noticeable')){
            document.querySelector('.title i.fa-info-circle').classList.remove('noticeable')
        }

    }else{
        instructionInProgress = true;
        document.querySelector('.instruction-start').classList.remove('hidden');
        //if pannel is open close it
        document.getElementById('panel-toggle').checked=false;
    }
}

//------------------------------------------------------
//         Handling mouse functions (Start, end, wall, weight)
//------------------------------------------------------
var mouseValue = 'wall';
var mouseIsPressed = false;
var weightIsSelected = false;

var diagonalAllowed = false;
var universalGrid = false;

//var inProgress = false;



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
        //#1 if toturial is open hide it
        if(!document.querySelector('.toturial').classList.contains('hidden')){
            document.querySelector('.toturial').classList.add('hidden');
            let checkboxs = document.querySelectorAll(`.algo-title input[type='checkbox']`);
        
            checkboxs.forEach(checkbox => {
                if(checkbox.checked)  checkbox.checked = false;
            })
        }
        //#2 if universal grid all tables should be cleaned otherwise just this table
        if(universalGrid){
            tables.forEach(table=>table.active && table.cleanGrid());
            return;
        }
        tables.forEach(table=>table.id===e.target.parentElement.id && table.cleanGrid())
    }

    btn.ondblclick = (e)=>{

        //#1 if toturial is open hide it
        if(!document.querySelector('.toturial').classList.contains('hidden')){
            document.querySelector('.toturial').classList.add('hidden');
            let checkboxs = document.querySelectorAll(`.algo-title input[type='checkbox']`);
        
            checkboxs.forEach(checkbox => {
                if(checkbox.checked)  checkbox.checked = false;
            })
        }

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






//-------------------------------------------------------------
//             Visualize Btn
//-------------------------------------------------------------
const visBtn = document.getElementById('visBtn')

visBtn.addEventListener('click',()=>{

    const algos = document.querySelectorAll(`.control-item:nth-child(1) > ul input:checked, .control-item:nth-child(2) > ul input:checked`);

    

    if(algos.length===0){
        showMessage('please select an algorithm to visualize.')
        return
    }

    if(instructionInProgress){
        showMessage('Please finish the instructions first, or skip them.');
        return;
    }

    document.getElementById("panel-toggle").checked = false;

    document.getElementById('legend-btn').checked= false;

    if(!document.querySelector(`.toturial`).classList.contains('hidden')){
        document.querySelector(`.toturial`).classList.add('hidden')
    }

    //inProgress = true;

    let allActiveTablesProgress = []

    for(let i=0;i<tables.length;i++){
        if(tables[i].active){
            tables[i].cleanGrid();
            tables[i].runAlgo(diagonalAllowed,mazeSpeed,graphSpeed,manhattanDist);
            allActiveTablesProgress.push(tables[i].inProgress);
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











//-----------------------------------------------------------
//                    Showing Toturials
//------------------------------------------------------------

const graphCheckboxs = document.querySelectorAll(`.table .algo-title input[type='checkbox']`);

const toturial = document.querySelector('.toturial');

graphCheckboxs.forEach(checkbox=>checkbox.addEventListener('click',e=>{
    //if instructions is in progress do'nt show
    if(instructionInProgress){
        showMessage('Please finish the instructions first, or skip them.');
        return;
    }

    // if control panel or legend are showing make them go away
    document.getElementById('panel-toggle').checked= false;
    document.getElementById('legend-btn').checked= false;

    
    if(e.target.checked){
        toturial.classList.remove('hidden');
       
        populateToturialDiv(e.target.nextElementSibling.innerText);
        
    }else{
        toturial.classList.add('hidden');

        for(let i=0;i<graphCheckboxs.length;i++){
            graphCheckboxs[i].checked = false;
        }

        populateToturialDiv('jjj')
    }
}));

//when opening the control-panel toturial should disapear
document.getElementById('panel-toggle').onclick = e =>{
    if(e.target.checked){
        // if toturial is open hide it and make checkbox unchecked
        if(!document.querySelector('.toturial').classList.contains('hidden')){
            document.querySelector('.toturial').classList.add('hidden');
            
            let checkboxs = document.querySelectorAll(`.algo-title input[type='checkbox']`);
        
            checkboxs.forEach(checkbox => {
                if(checkbox.checked)  checkbox.checked = false;
            })
        }

        //if instruction is in progress make second step appear anf first disappear
        if(instructionInProgress){
            let firstMassage = document.querySelector('.instruction-start');
            let secondMassage = document.querySelector('.instruction-algos');
            if(!firstMassage.classList.contains('hidden')){
                firstMassage.classList.add('hidden');
                secondMassage.classList.remove('hidden');
            }
        }
    }
}


//when clicking on the toturial, it disappears
/*toturial.addEventListener('click',(e)=>{
    if(!toturial.classList.contains('hidden')){
        toturial.classList.add('hidden')
    }
    //make all checkboxs unchecked:
    let checkboxs = document.querySelectorAll(`.algo-title input[type='checkbox']`);
        
            checkboxs.forEach(checkbox => {
                if(checkbox.checked)  checkbox.checked = false;
            });
})*/




const populateToturialDiv = (algoName) =>{
    const title = document.querySelector(' .toturial .title');
    const desc = document.querySelector('.toturial .description');
    const backFace = document.querySelector('.toturial .back-face p')
    switch (algoName){
        case "Dijkstra's algorithm":
            title.innerText = "Dijkstra's algorithm";

            desc.innerText = `Dijkstra will evaluate the distance from start node at every move and it will visit the node with the cheapest cost at every move.It is a weighted algorithm and will take into account the cost of every node. Dijkstra will provide a shortest path with cheapest cost.`
           
            backFace.innerText = `In this application dijkstra was implemented with a priority queue(i.e with a min heap) to keep track of cheapest node available at all time. 
            you can add weighted cells to the grid by selecting the designated option, to see how the algorithm tries to avoid them. Every weighted cells, in this application, is twenty times more costly than a regular cell.`

            return;

        case "A*":
            title.innerText = "A* algorithm";

            desc.innerText = `A* is the most popular choice for pathfinding, because it’s fairly flexible and can be used in a wide range of contexts.

            A* will consider the distance from the start node as well as the estimated distance from goal node in every step. And then it will choose the cheapest path at every move based on this totual cost function.
            `;

            backFace.innerText = `A* is like Dijkstra’s Algorithm in that it can be used to find a shortest path. A* is like Greedy Best-First-Search in that it can use a heuristic to guide itself. 
            In other words, A* is faster and smarter than Dijkstra.That is, it will find a shortest path with visiting less nodes. And it is more careful than Greedy best first search in choosing its path.That is, it will examin more cells but it can garantee a shortest path.`;

            return;

       case "greedy BFS":
        title.innerText = "Greedy Best-First Search";

        desc.innerText = `The algorithm will start from start node. it evaluates all its neighbors base on a heuristic function, to see how far each node is from the goal, and then it will choose the node with least distance from the goal. Greedy BFS is not guaranteed to find a shortest path. However, it runs much quicker than Dijkstra because it uses the heuristic function to guide its way towards the goal very quickly.`;

        backFace.innerText = `
        In this application the default heuristic function is based on 'Euclidean distance' of each node from the goal. However you can select 'Manhattan distance' from options to see how the behavior of gbfs and A* will slightly change. Every heuristic function will work as long as it is consistent and it does not overestimate the distance.
        Since the algorithm is greedy and choose the best move at the moment, you can see how it will get stuck in obstacles.`;

        return;

        case "Depth-First Search":
            title.innerText = "Depth-First Search";

            desc.innerText =`DFS starts at the start node and explores one possible path until it eighther reaches to the end node or to a point that there is no other unvisited node left. After reaching to the end of one path, it will backtrack to explore other possible paths.`;

            backFace.innerText = `Depth-First search will not provide a shortest path. It will only tell you if a path exist. Also it is not a weighted algorithm.You can see if you make some cells weighted, the algorithm will treat them the same as other unweighted nodes.
            DFS can be implemented recursively, or iteratively. In this application DFS was implemented iteratively with the help of a stack.`

        return;


        case "Breadth-First Search":
            title.innerText = "Breadth-First Search";
          
            desc.innerText = `BFS explores nodes level by level. That is, after visiting start node, it will visit all neighbors(or children in a tree traversal) of start node before going to next level and it will keep doing this process until it reaches the end node.`;

            backFace.innerText = `BFS is not a weighted algorithm. That is, it will treat all nodes the same regardless of them having different costs. But it will find a shortest path(only based on the number of nodes visited).
            BFS was implemented by a "queue".In grids without any weighted node,Breadth-first search  will behave almost exactly like dijkstra . You can see that by visualizing both algorithms at same time with a same grid without weighted cells.
            You can create exact same grids with 'Universal Grid' option. `;

        return;


        case "Recursive Backtracker":
            title.innerText = "Recursive Backtracker";
            desc.innerText = `This algorithm is a randomized version of the depth-first search algorithm. It chooses a cell, selects one of its unseen neighbors and destroys the wall between them. It keeps doing this process until it reaches a cell with no unseen neighbor. At this point It backtracks until it sees a new cell or the maze is done.`;
            backFace.innerText = `For implementing resursive backtracker maze generation algorithm, in this application, every other node was considered walls of its neighbors. Therefore the neighbors of each cell is actually two cells away from the current cell, and the rest of the algorithm is the same as described before.`
        return;


        case "Recursive Division":
            title.innerText = "Recursive Division";
            desc.innerText = `This algorithm makes horizontal or vertical walls at every step(based on the width and height of current area), and make a passage in this wall. The algorithm will call itself on two areas created by the wall. The process will continue until reaching minimum area eligible. At this point function will return and maze is done.`;
            backFace.innerHTML = `<br/>
            You can see my github repo to see the code
             <a href='http://github.com/MinaKhamesi' target='_blank'>Check out my github</a>`
        return;


        case "Randomized Prim":
            title.innerText = "Randomized Prim's algorithm";
            desc.innerText = `This algorithm is a randomized version of Prim's algorithm.Algorithm starts with a grid full of walls. It picks a cell, marks it as part of the maze. Add the walls of the cell to the wall list.And while there are walls in the wall list, it picks a random wall from the list. Pops it and if only one of the two cells that the wall divides is visited, then it makes the wall a passage and marks the unvisited cell as part of the maze. And adds the neighboring walls to the wall list.`;
            backFace.innerHTML = `To implement this algorithm in a grid of rows and columns, like in recursive backtracker algorithm, every other node is treated like a wall and neighbors are actually two cells away from each other(because the cell between them is being a wall).
             I actually kept track of frontiers, the cells that at least one of their neighbors has been visited and is part of the maze. And every time one of them is selected from the frontier list, the algorithm makes the frontier and also the wall between frontier and its visited neighbor(aka, the cells that behave like a wall in this implementation) a passage. The process will continue as long as there are frontiers left.`;
        return;


        case "spiral":
            title.innerText = "Spiral algorithm";
            desc.innerText = `This is a very simple 2-D matrix traversal algorithm. While the width or height is not less than a threshold, the algorithm will visit the first row, last column, last row and first column in this order and after each iteration these variables will increment and decrement to make traversal possible.`;
            backFace.innerHTML = `<br/>
            You can see my github repo to see the code
             <a href='http://github.com/MinaKhamesi' target='_blank'>Check out my github</a>`
        return;


        case "diagonal steps":
            title.innerText = "diagonal steps algorithm";
            desc.innerText = `This is a very simple 2D matrix traversal. It is exactly written as you see it in the visualization. The algorithm has a "going-up" variable that while true it will go up diagonally,that is decrementing row while incrementing column number until we either reach first row or last culumn and then we go down until reaching either first column or last row.`;
            backFace.innerHTML = `
            
            
            You can see my github repo to see the code
             <a href='http://github.com/MinaKhamesi' target='_blank'>Check out my github</a>`
        return;


        default:
            title.innerText = '';
            desc.innerText = '';
            backFace.innerText = '';
            return;
    }
}

