import {runAlgo,generateMaze} from './GraphAlgos.js';

export default class Table{

    constructor(id,active=false) {
        this.id = id;
        this.graphAlgo = null;
        this.mazeAlgo = null;
        this.active = active;
        this.inProgress = false;
        this.grid = null;
        this.getGrid()
    }


    activate(){
        this.active = true;
        document.getElementById(this.id).style.display = 'flex';
        this.updateTitle();
    }


    deactivate(){
        this.active = false;
        this.inProgress = false;
        this.mazeAlgo = null;
        this.graphAlgo = null;
        document.getElementById(this.id).style.display = 'none'; 
        this.updateTitle();
        if(this.grid !== null){
           this.cleanBoard();
        }
    }

    updateTitle(){
        if(this.graphAlgo){
            document.querySelector(`#${this.id} .algo-title .graph-algo`).innerText = this.graphAlgo
        }else{
            document.querySelector(`#${this.id} .algo-title .graph-algo`).innerText = '';
        }
        if(this.mazeAlgo){
            document.querySelector(`#${this.id} .algo-title .maze-algo`).innerText = this.mazeAlgo;
        }else{
            document.querySelector(`#${this.id} .algo-title .maze-algo`).innerText = '';
        }
    }


    runAlgo(diagonal,mazeSpeed,graphSpeed,manhattan){
        if(this.inProgress) return;

        this.inProgress = true;

        document.getElementById('panel-toggle').disabled = true;

        const [start,end] = this.getGrid();
        
        let mazeDelay = 0;
        if(this.mazeAlgo){
            this.cleanBoard();
           mazeDelay = generateMaze(this.mazeAlgo, this.grid,mazeSpeed)
        }

        setTimeout(()=>{
            if(this.graphAlgo){
                let [time,blocks, delay] = runAlgo(this.graphAlgo, this.grid, start, end, diagonal,graphSpeed,manhattan);
                
                if(time!==-1) {
                    setTimeout(()=>{
                        this.showTimeBlock(time,blocks);
                        this.inProgress = false;
                        document.getElementById('panel-toggle').disabled = false;
                    }, delay);
    
                    
                }else{
                    this.showMessage('Path Not Found!');
                    this.inProgress = false;
                    document.getElementById('panel-toggle').disabled = false;
                }
            
            }
        },mazeDelay);
        
        this.inProgress = false;
        document.getElementById('panel-toggle').disabled = false;
    }


    getGrid(){
        const grid = []
        let start;
        let end;
        const table = document.querySelector(`#${this.id}`);
        for(let i=3; i<table.children.length; i++){
            const row = table.children[i].children;
            const currentRow = []
            for(let j=0; j<row.length; j++){
                currentRow.push(row[j]);
                if (row[j].classList.contains('start')) start=[i-3,j];
                if (row[j].classList.contains('end'))    end=[i-3,j];
            }
            grid.push(currentRow);
        }
        this.grid = grid;
        
        return [ start, end]
    }


    cleanGrid(){
        if (this.inProgress)  return
        document.querySelector(`#${this.id} .duration-msg`).style.display = 'none';
        this.grid.map(row=>row.map(cell=>{
            if (cell.classList.contains('visited')){
                cell.classList.remove('visited');
            }
            if (cell.classList.contains('shortest-path')){
                cell.classList.remove('shortest-path');
            }
        }))
    }


    cleanBoard(){
        if (this.inprogress) return
        this.cleanGrid();
        this.grid.map(row=>row.map(cell=>{
            if (cell.classList.contains('wall')){
                cell.classList.remove('wall');
            }
            if (cell.classList.contains('weight')){
                cell.classList.remove('weight');
            }
        }))
    }



    showTimeBlock(time,blocks){
        document.querySelector(`#${this.id} .duration-msg`).innerHTML = `<div class="duration">Duration : <span>${time}</span> ms</div>
        <div class="blocks">Blocks: <span>${blocks} </span></div>
        `;
        document.querySelector(`#${this.id} .duration-msg`).style.display = 'block';
        document.querySelector(`#${this.id} .duration-msg`).style.background = '#fff';

    }

    showMessage(msg){
        document.querySelector(`#${this.id} .duration-msg`).style.display = 'block';
        document.querySelector(`#${this.id} .duration-msg`).style.background = 'red';
        document.querySelector(`#${this.id} .duration-msg`).innerHTML = msg;

    }


}



