
export const    runAlgo = (algo,grid,start,end,diagonal,graphSpeed,manhattan) =>{
    console.log(manhattan);
    switch(algo){
        case 'A*':
            return AStart(grid, start, end, diagonal, graphSpeed,manhattan);

        case 'Breadth-First Search':
            return bfs(grid, start, end, diagonal, graphSpeed);


        case 'Depth-First Search':
            return dfs(grid,start, end,diagonal, graphSpeed)


        case "Dijkstra's algorithm":
            return dj(grid, start, end, diagonal, graphSpeed);

        case 'greedy BFS':
            return gBFS(grid,start,end,diagonal, graphSpeed,manhattan);

        default:
            return
    }
}



export const    generateMaze = (mazeAlgo, grid,mazeSpeed) =>{
    switch(mazeAlgo){
        case "Recursive Backtracker":
            return rb(grid,mazeSpeed)

        case "Recursive Division":
            return rd(grid,mazeSpeed);

        case 'Randomized Prim':
            return primeAlgo(grid,mazeSpeed);

        case "spiral":
            return spiral(grid,mazeSpeed);

        case "diagonal steps":
            return dSteps(grid,mazeSpeed);

        default:
            return
    }
}

//-------------------------------------------------------
//            Graph Search Algorithms
//-------------------------------------------------------

const bfs = (grid, start, end, diagonal, graphSpeed) =>{
    
    const startTime = Date.now();

    const visited = grid.map(row=>row.map(node=>false));

    const prevNodes = grid.map(row=>row.map(ele=>null));

    const nodesToAnimate = [];

    const [goalRow,goalCol] = end;
    let [currentRow, currentCol] = start;

    visited[currentRow][currentCol] = true;

    let nodesToVisit = [start];

    while (nodesToVisit.length>0){
        [currentRow,currentCol] = nodesToVisit.shift();

        nodesToAnimate.push(grid[currentRow][currentCol]);

        if(currentRow===goalRow && currentCol === goalCol){
            
            const endTime = Date.now();

            let delay = animateCells(nodesToAnimate, 'visited',0,graphSpeed);

            let shortestPath = backtrackPath(prevNodes,end,grid);
            delay = animateCells(shortestPath,'shortest-path',delay,graphSpeed);

            const algoTime = endTime - startTime;
            const blocks = shortestPath.length;
            
            return [algoTime, blocks, delay];
        }

        const neighbors = getNeighbors(grid,currentRow,currentCol,diagonal);

        for(let i=0;i<neighbors.length;i++){

            const [row,col] = neighbors[i];

            if(visited[row][col]) continue;

            visited[row][col] = true;

            prevNodes[row][col] = [currentRow, currentCol];

            nodesToVisit.push([row,col]);
        }

    }

    return [-1,-1,0];
}

//-----------------------------------------------------------
//                      HELPER  FUNCTIONS
//-----------------------------------------------------------
// #1-  get neighbors
//----------
const getNeighbors = (grid,currentRow,currentCol,allowDiagonal) =>{
    let possibleNeighbors;
        if(allowDiagonal){
            possibleNeighbors = [[currentRow+1,currentCol],[currentRow,currentCol+1],[currentRow-1,currentCol],[currentRow,currentCol-1],[currentRow+1,currentCol+1],[currentRow-1,currentCol+1],[currentRow-1,currentCol-1],[currentRow+1,currentCol-1]];
        }else{
            possibleNeighbors = [[currentRow+1,currentCol],[currentRow,currentCol+1],[currentRow-1,currentCol],[currentRow,currentCol-1]];
        }
        let neighbors=[]
        for (let i=0;i<possibleNeighbors.length;i++){
            const [row,col] = possibleNeighbors[i]
            if(isCellValid(row,col,grid)){
                neighbors.push([row, col])
                }      
        }
        return neighbors;
}

const isCellValid = (row,col,grid)=>{
    return row>=0 && col>=0 && row<grid.length && col<grid[row].length && !grid[row][col].classList.contains('wall');
}

//-----------
//#2-     animate visited
//------------
function animateCells(cells,cellClass,delay=0,speed=30){
    let counter;
    for(let i=0;i<cells.length;i++){
        const currentCell = cells[i]
                if(currentCell.classList.contains('start') || currentCell.classList.contains('end')) continue;
            setTimeout(()=>{
                
                currentCell.classList.add(cellClass)
            },speed*i + delay)

            counter = i*speed+delay
        }
        return counter;
    }



// #3    backtracking the short path
function backtrackPath(prevNodes,end,grid){
    let shortestPath = []
    let [currentRow, currentCol] = end;
    let currentElement = grid[currentRow][currentCol];
    while (prevNodes[currentRow][currentCol]!==null){

        shortestPath.push(currentElement);

        [currentRow, currentCol] = prevNodes[currentRow][currentCol];

        currentElement = grid[currentRow][currentCol];
    }

    return shortestPath.reverse();
}




//----------------------------------
//       Depth First Search
//----------------------------------


const dfs = (grid, start, end, diagonal,graphSpeed) =>{
    console.log('depth first start')
    const startTime = Date.now();

    const visited = grid.map(row=>row.map(node=>false));

    const prevNodes = grid.map(row=>row.map(ele=>null));

    const nodesToAnimate = [];

    const [goalRow,goalCol] = end;
    let [currentRow, currentCol] = start;

    visited[currentRow][currentCol] = true;

    let nodesToVisit = [start];

    let counter = 0
    while (nodesToVisit.length>0 && counter<1600){
        counter += 1;

        [currentRow,currentCol] = nodesToVisit.pop();

        visited[currentRow][currentCol] = true;

        nodesToAnimate.push(grid[currentRow][currentCol]);

        if(currentRow===goalRow && currentCol === goalCol){
            
            const endTime = Date.now();

            let delay = animateCells(nodesToAnimate, 'visited',0 , graphSpeed);

            let shortestPath = backtrackPath(prevNodes,end,grid);
            delay = animateCells(shortestPath,'shortest-path',delay, graphSpeed);

            const algoTime = endTime - startTime;
            const blocks = shortestPath.length;
            
            return [algoTime, blocks, delay];
        }

        const neighbors = getNeighbors(grid,currentRow,currentCol,diagonal);

        for(let i=0;i<neighbors.length;i++){

            const [row,col] = neighbors[i];

            if(visited[row][col]) continue;

            

            prevNodes[row][col] = [currentRow, currentCol];

            nodesToVisit.push([row,col]);
        }

    }

    return [-1,-1,0];
}




/*const dfs = (grid, start, end, diagonal,nodesToAnimate=[],visited=null) =>{

    
    if(visited===null)  visited = grid.map(ele=>ele.map(node=>false));

    let [row, col] = start;

    const [goalRow, goalCol] = end;

    if(visited[row][col]) return 
    

    visited[row][col] = true;
    
    nodesToAnimate.push(grid[row][col])

    if (row==goalRow && col==goalCol){

        let delay = animateCells(nodesToAnimate,'visited');

       let blocks = nodesToAnimate.length;

     return [true,blocks,delay]

    }

        

        let neighbors = getNeighbors(grid,row,col,diagonal);

        for (let i=0;i<neighbors.length;i++){

           const [neighborRow,neighborCol] = neighbors[i];

           if (visited[neighborRow][neighborCol]) continue;
           let result = dfs(grid,[neighborRow,neighborCol],end,diagonal,nodesToAnimate,visited)
           if (result && result[0]){
                return dfs(grid,[neighborRow,neighborCol],end,diagonal,nodesToAnimate,visited)
        }
    }

    
  } */


//-----------------------------
//    Dijkstra's Algorithm
//-----------------------------

const dj = (grid, start, end, diagonal, graphSpeed) =>{
    console.log(' dj start ');
    const startTime = Date.now();
    
    const visited = grid.map(ele=>ele.map(node=>false));
    const dist = grid.map(ele=>ele.map(node=>Number.POSITIVE_INFINITY));
    const weight = grid.map(row=>row.map(ele=> (ele.classList.contains('weight')) ? 20 : 1
    ));
    const prevNodes = grid.map(row=>row.map(ele=>null));

    const [goalRow, goalCol] = end;

    const nodesToAnimate = []

    const pq = new Heap();


    let [currentRow,currentCol] = start;

    pq.insert([0,[currentRow,currentCol]]);

    dist[currentRow][currentCol] = 0;

    visited[currentRow][currentCol] = true;

    while(!pq.isEmpty()){
        const [currentDis,node] = pq.pop();
        [currentRow, currentCol] = node;


        visited[currentRow][currentCol] = true;

        if(node==start || node==end){
            console.log(start)
        }else{
            nodesToAnimate.push(grid[currentRow][currentCol]);
        }
        
        
        if(dist[currentRow][currentCol]<currentDis) continue;

        if(currentRow==goalRow && currentCol===goalCol){
            const endTime = Date.now();

            let delay = animateCells(nodesToAnimate, 'visited',0, graphSpeed);

            let shortestPath = backtrackPath(prevNodes,end,grid);

            delay = animateCells(shortestPath,'shortest-path',delay,graphSpeed);

            const algoTime = endTime - startTime;
            const blocks = shortestPath.length;
            
            return [algoTime, blocks, delay];
        }
        let neighbors = getNeighbors(grid,currentRow,currentCol,diagonal);

        for(let i=0;i<neighbors.length;i++){

            let [row,col] = neighbors[i];

            if (visited[row][col]) continue;

            let newDist = currentDis + weight[row][col];

            if (newDist < dist[row][col]){
                dist[row][col] = newDist;
                pq.insert([newDist, [row,col]]);
                prevNodes[row][col] = [currentRow, currentCol];
            }
        }

    }
    return [-1,-1,0]
}
//----------------------
// A* ALgorithm
//-----------------------
const AStart = (grid, start, end, diagonal,graphSpeed,manhattan) =>{
    
    const startTime = Date.now();
    
    const visited = grid.map(ele=>ele.map(node=>false));
    const dist = grid.map(ele=>ele.map(node=>Number.POSITIVE_INFINITY));
    const weight = grid.map(row=>row.map(ele=> (ele.classList.contains('weight')) ? 20 : 1
    ));
    const prevNodes = grid.map(row=>row.map(ele=>null));

    const [goalRow, goalCol] = end;

    const nodesToAnimate = []

    const pq = new Heap();


    let [currentRow,currentCol] = start;


    dist[currentRow][currentCol] = 0;

    let hDist = (manhattan)?  hDis(goalRow,goalCol,currentRow,currentCol,'Manhattan') : hDis(goalRow,goalCol,currentRow,currentCol) ;


    let totalCost = hDist + 0;

    pq.insert([totalCost,[currentRow,currentCol]]);

    visited[currentRow][currentCol] = true;

    while(!pq.isEmpty()){
        const [currentCost,node] = pq.pop();
        [currentRow, currentCol] = node;


        visited[currentRow][currentCol] = true;

        if(node==start || node==end){
            console.log(start)
        }else{
            nodesToAnimate.push(grid[currentRow][currentCol]);
        }
        
        let currentHDist = (manhattan)?  hDis(goalRow,goalCol,currentRow,currentCol,'Manhattan') : hDis(goalRow,goalCol,currentRow,currentCol) ;
    
        if(dist[currentRow][currentCol] + currentHDist < currentCost) continue;

        if(currentRow==goalRow && currentCol===goalCol){
            const endTime = Date.now();

            let delay = animateCells(nodesToAnimate, 'visited', 0 , graphSpeed);

            let shortestPath = backtrackPath(prevNodes,end,grid);

            delay = animateCells(shortestPath,'shortest-path',delay, graphSpeed);

            const algoTime = endTime - startTime;
            const blocks = shortestPath.length;
            
            return [algoTime, blocks, delay];
        }

        
        let neighbors = getNeighbors(grid,currentRow,currentCol,diagonal);

        for(let i=0;i<neighbors.length;i++){

            let [row,col] = neighbors[i];

            if (visited[row][col]) continue;

            let newDist = dist[currentRow][currentCol] + weight[row][col];

            let neighborHDist = (manhattan)?  hDis(goalRow,goalCol,row,col,'Manhattan') : hDis(goalRow,goalCol,row,col) ;
            

            let newTotalCost = newDist + neighborHDist;

            if (newTotalCost < dist[row][col]+neighborHDist){

                dist[row][col] = newDist;

                pq.insert([newTotalCost, [row,col]]);

                prevNodes[row][col] = [currentRow, currentCol];
            }
        }

    }

    return [-1,-1,0]
}

//----------------------------
//  Greedy best first search
//---------------------------
const gBFS = (grid, start, end, diagonal,graphSpeed,manhattan) =>{
    
    const startTime = Date.now();
    
    const visited = grid.map(ele=>ele.map(node=>false));
    const Hdist = grid.map(ele=>ele.map(node=>Number.POSITIVE_INFINITY));
    const weight = grid.map(row=>row.map(ele=> (ele.classList.contains('weight')) ? 20 : 1
    ));
    const prevNodes = grid.map(row=>row.map(ele=>null));

    const [goalRow, goalCol] = end;

    const nodesToAnimate = []

    const pq = new Heap();


    let [currentRow,currentCol] = start;

    let currentHdist = (manhattan) ?  hDis(currentRow,currentCol,goalRow,goalCol,'Manhattan') : hDis(currentRow,currentCol,goalRow,goalCol) ;
    

    pq.insert([currentHdist,[currentRow,currentCol]]);

    Hdist[currentRow][currentCol] = currentHdist;

    visited[currentRow][currentCol] = true;

    while(!pq.isEmpty()){
        const [currentHDist,node] = pq.pop();
        [currentRow, currentCol] = node;


        visited[currentRow][currentCol] = true;

        if(node==start || node==end){
            console.log(start)
        }else{
            nodesToAnimate.push(grid[currentRow][currentCol]);
        }
        
        
        if(Hdist[currentRow][currentCol]<currentHDist) continue;

        if(currentRow==goalRow && currentCol===goalCol){
            const endTime = Date.now();

            let delay = animateCells(nodesToAnimate, 'visited',0,graphSpeed);

            let shortestPath = backtrackPath(prevNodes,end,grid);

            delay = animateCells(shortestPath,'shortest-path',delay, graphSpeed);

            const algoTime = endTime - startTime;
            const blocks = shortestPath.length;
            
            return [algoTime, blocks, delay];
        }
        let neighbors = getNeighbors(grid,currentRow,currentCol,diagonal);

        for(let i=0;i<neighbors.length;i++){

            let [row,col] = neighbors[i];

            if (visited[row][col]) continue;
            let newHdist = (manhattan)?  hDis(currentRow,currentCol,goalRow,goalCol,'Manhattan') : hDis(currentRow,currentCol,goalRow,goalCol) ;
            //let newHdist = currentHDist + weight[row][col];

            if (newHdist < Hdist[row][col]){
                Hdist[row][col] = newHdist;
                pq.insert([newHdist, [row,col]]);
                prevNodes[row][col] = [currentRow, currentCol];
            }
        }

    }
    return [-1,-1,0]
}








const hDis = (row1,col1,row2,col2,distance='Euclidian')=>{
    console.log('we are at hdis function' + distance);
    switch(distance){
        case 'Euclidian':
            return Math.sqrt((row2-row1)**2 + (col2-col1)**2);
        case 'Manhattan':
            return Math.abs((row2-row1)) + Math.abs((col2-col1));
        default:
            return
    }
}

//------------
//   HEAP  Class
//------------

class Heap{

    constructor(){
        this.heap = [];
    }

    isEmpty(){
        return this.heap.length === 0 ;
    }


    //newEntry =[dist,[row,col]]
    insert(newEntry){
        this.heap.push(newEntry);
        this.siftUp(this.heap,this.heap.length-1);
    }


    pop(){
        swap(this.heap,0,this.heap.length-1);
        const nodeToReturn = this.heap.pop();
        this.siftDown(this.heap,0);
        return nodeToReturn;
    }



    siftUp(arr,idx){
        let currentIdx = idx;
        let parentIdx = Math.floor((idx-1)/2);
        while (currentIdx > 0 &&    arr[currentIdx][0] < arr[parentIdx][0]){
            swap(arr,currentIdx,parentIdx);
            currentIdx = parentIdx;
            parentIdx = Math.floor((currentIdx-1)/2);
        }
    }


    siftDown(arr,idx){

        let currentIdx = idx;
        let leftChildIdx = (idx*2) + 1;

        while (leftChildIdx<arr.length){

            let rightChildIdx = (leftChildIdx+1<arr.length) ? leftChildIdx+1 : -1;


            let nodeToSwap;

            if (rightChildIdx===-1 || arr[leftChildIdx][0] < arr[rightChildIdx][0]){
                nodeToSwap = leftChildIdx
            }else{
                nodeToSwap = rightChildIdx;
            }


            if(arr[currentIdx][0] > arr[nodeToSwap][0]){
                swap(arr,currentIdx, nodeToSwap);
                currentIdx = nodeToSwap;
                leftChildIdx = (currentIdx*2) + 1;
            }else{
                return
            }


        }
    }


}

const swap = (arr,i,j)=>{
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}









//-----------------------------------------------------------------
//                Maze Generating Algorithms
//------------------------------------------------------------------

const rb = (grid,mazeSpeed)=>{
    
    grid.map(row=>row.map(cell=>{
        if(cell.classList.contains('start') || cell.classList.contains('end')) return;
        cell.classList.add('wall');
    }));

    const visited = grid.map(row=>row.map(cell=>false));

    const nodesToRemoveWall = []

    let [currentRow,currentCol] = [0,0];
    
    visited[currentRow][currentCol] = true;

    let stack = []

    
    while(true){
        //counter += 1;

        nodesToRemoveWall.push(grid[currentRow][currentCol]);

    
    let next = getRBNeighbors(currentRow,currentCol, grid,visited);

    if(next){
        stack.push(next);

        let [nextRow,nextCol] = next;

        visited[nextRow][nextCol] = true;

        let wall = getCellBeetween(currentRow, currentCol,nextRow,nextCol,grid);

        nodesToRemoveWall.push(wall);

        currentRow = nextRow;
        currentCol = nextCol;

    }else{

        if(stack.length>0){

            next = stack.pop();

            let [nextRow, nextCol] = next;

            currentRow=nextRow;
            currentCol = nextCol;
        }else{
            break;
        }
       
    }
    }

    
    for(let i=0;i<nodesToRemoveWall.length;i++){
        let cell = nodesToRemoveWall[i];
        setTimeout(()=>{
            cell.classList.remove('wall');
        },i*mazeSpeed)
    }
    let delay = nodesToRemoveWall.length*mazeSpeed;

    return delay

}

//--------------------------------------
//     Recursive Backtracker Helper functions
//-----------------------------------------

const getCellBeetween = (row1,col1,row2,col2,grid)=>{
    if(row1==row2){
        if(col1>col2){
            return grid[row1][col2+1]
        }else{
            return grid[row1][col1+1]
        }
        
    }else if(col1===col2){
        if(row2>row1){
            return grid[row1+1][col1]
        }else{
            return grid[row2+1][col1]
        }
    }
}

const getRBNeighbors = (currentRow,currentCol,grid,visited)=>{

    let possibleNeighbors = [
        [currentRow+2,currentCol],
        [currentRow-2, currentCol],
        [currentRow, currentCol+2],
        [currentRow, currentCol-2]
    ]


    let neighbors = [];

    for(let i=0;i<possibleNeighbors.length;i++){
        let [row,col] = possibleNeighbors[i];
        if(row<0 || row>grid.length-1 || col<0 || col>grid[0].length-1) continue;
        if(visited[row][col]) continue;
        neighbors.push([row,col])
    }

    if(neighbors.length>0){
        const nextIdx = Math.floor(Math.random()*neighbors.length);
        return neighbors[nextIdx];
    }else{
        return;
    }

}



//----------------------
//   Recursive Division
//----------------------
const rd = (grid,mazeSpeed)=>{
    console.log('rd start');
    const nodesToAnimate = []

    const isPassage = grid.map(row=>row.map(cell=>false))

    //make edges wall. just for more beautiful look
    grid[0].map(cell=>nodesToAnimate.push(cell));

    grid.map(row=>row.map((cell,index)=> {
        if(index==grid[0].length-1){
            nodesToAnimate.push(cell)
        }
    }));

    grid[grid.length-1].reverse().map(cell=>nodesToAnimate.push(cell));

    grid.map(row=>row.map((cell, index)=> index==0  && nodesToAnimate.push(cell)));


    let firstRow = 1;
    let lastRow = grid.length - 2;
    let firstCol = 1;
    let lastCol = grid[0].length - 2;

   let orientation = chooseOrientation(grid,firstRow,lastRow,firstCol,lastCol);
    devide(grid,firstRow,lastRow,firstCol,lastCol,orientation,nodesToAnimate,isPassage);

    let delay = animateCells(nodesToAnimate,'wall',0,mazeSpeed);
    

    return delay
}


//-------------------------
//   Recursive Devision Helper Functions
//---------------------------


//#1-choose orientation
const chooseOrientation = (grid,firstRow,lastRow,firstCol,lastCol) =>{
    let width = lastCol - firstCol;
    let height = lastRow - firstRow;
    if(width>height){
        return 'Vertical'
    }else if(height>width){
        return 'Horizontal'
    }else{
        const num = Math.random();
        return (num<0.5) ? 'Vertical' : 'Horizontal'
    }
}


//#2- devide
const devide = (grid,firstRow,lastRow,firstCol,lastCol,orientation,nodesToAnimate,isPassage) =>{
    let width = lastCol - firstCol + 1;
    let height = lastRow - firstRow + 1;

    let firstValidRow = firstRow ;
    let lastValidRow = lastRow;
    let firstValidCol = firstCol;
    let lastValidCol = lastCol;


    if(orientation=='Horizontal'){
        firstValidRow += 1
        lastValidRow -= 1
    }else{
        firstValidCol += 1
        lastValidCol -= 1
    }
    

    let validWidth = lastValidCol - firstValidCol + 1;
    let validHeight = lastValidRow - firstValidRow + 1;
    

    if(width<2 || height<2 || validHeight<1 || validWidth<1) return;

    if(orientation=='Horizontal'){


        let rowIdxToBeWall = Math.floor(Math.random()* validHeight) + firstValidRow;
        //let passageIdx = Math.floor(Math.random() * validWidth) + firstValidCol;

        let passageIdx;
        if (isPassage[rowIdxToBeWall][firstCol-1]){
			 passageIdx = firstCol;
		} else if (isPassage[rowIdxToBeWall][lastCol+1]){
			 passageIdx = lastCol;
		} else {
			 passageIdx = Math.random()>0.5 ? firstCol: lastCol; // random end assignment
        }

        grid[rowIdxToBeWall].forEach((cell, index)=>{
            if(cell.classList.contains('start') || cell.classList.contains('end')){
                isPassage[rowIdxToBeWall][index] = true;
            }
            if(isPassage[rowIdxToBeWall][index]) return
            if(index< firstValidCol  || index>lastValidCol) return;
            if(index==passageIdx){
                isPassage[rowIdxToBeWall][index] = true;
                return
            }
            nodesToAnimate.push(cell)
        })

        // upper side
        let orientation = chooseOrientation(grid,firstRow,rowIdxToBeWall-1,firstCol,lastCol);
        devide(grid,firstRow,rowIdxToBeWall-1,firstCol,lastCol,orientation,nodesToAnimate,isPassage);

        //Bottom side
        orientation = chooseOrientation(grid,rowIdxToBeWall+1,lastRow,firstCol,lastCol);
        devide(grid,rowIdxToBeWall+1,lastRow,firstCol,lastCol,orientation,nodesToAnimate,isPassage);


    }else{

        let colIdxToBeWall = Math.floor(Math.random()* validWidth ) + firstValidCol;
        //let passageIdx = Math.floor(Math.random() * validHeight) + firstValidRow;


        let passageIdx;
        if (firstRow-1>=0 && isPassage[firstRow-1][colIdxToBeWall]){
			passageIdx = firstRow;
		} else if (lastRow+1<grid.length && isPassage[lastRow+1][colIdxToBeWall]){
			passageIdx = lastRow;
		} else {
			passageIdx = Math.random()>0.5 ? firstRow: lastRow; // random end assignment
		}

        grid.forEach((row, index)=>{
            
            if (index<firstValidRow || index>lastValidRow) return;
            if (index == passageIdx){
                isPassage[index][colIdxToBeWall] = true;
                return;
            }

            row.forEach((cell, idx)=>{
                if(cell.classList.contains('start' || cell.classList.contains('end'))){
                    isPassage[index][idx] = true;
                }
                if(isPassage[index][idx]) return;
                
                idx==colIdxToBeWall && nodesToAnimate.push(cell);
        })});


        //left side
        orientation = chooseOrientation(grid,firstRow,lastRow,firstCol,colIdxToBeWall-1);
        devide(grid,firstRow,lastRow,firstCol,colIdxToBeWall - 1 ,orientation,nodesToAnimate,isPassage);


        //right side
        orientation = chooseOrientation(grid,firstRow,lastRow,colIdxToBeWall + 1,lastCol);
        devide(grid,firstRow,lastRow,colIdxToBeWall + 1, lastCol ,orientation,nodesToAnimate,isPassage);

    }

}




//--------------------------------
//  Prime Algo
//--------------------------------
const primeAlgo = (grid,mazeSpeed)=>{
    
    let start;
    let end;
    grid.map((row,index)=>row.map((cell,idx)=>{
        if(cell.classList.contains('start')){
            start = [index,idx];
            return;
        }else if(cell.classList.contains('end')){
            end = [index,idx];
            return;
        }else{
            cell.classList.add('wall');
        }
        
    }));

    const isWall = grid.map(row=>row.map(cell=>true));
    const visited = grid.map(row=>row.map(cell=>false));

    let currentRow = Math.floor(Math.random()*grid.length);
    let currentCol = Math.floor(Math.random()*grid[0].length);

    const frontiersList = [];

    const nodesToRemoveWall = [];

    nodesToRemoveWall.push(grid[currentRow][currentCol]);

    isWall[currentRow][currentCol] = false;

    let frontiers = getFrontiers(grid,currentRow,currentCol,isWall,visited);
    

    for(let i=0; i<frontiers.length; i++){
        frontiersList.push(frontiers[i])
        let [row,col] = frontiers[i]
        visited[row][col] = true;
    }
   
    while (frontiersList.length>0){
       
        let selectedIdx = Math.floor(Math.random()*frontiersList.length);

        let [currentRow,currentCol] = frontiersList[selectedIdx];

        let neighbors = getNeighborsPrime(grid,currentRow,currentCol,isWall);

        let randomNeighborIdx = Math.floor(Math.random()*neighbors.length);

        let neighbor = neighbors[randomNeighborIdx];

        let [neighborRow,neighborCol] = neighbor;

        let wall = getCellBeetween(neighborRow,neighborCol,currentRow,currentCol,grid);

        nodesToRemoveWall.push(wall);

        nodesToRemoveWall.push(grid[currentRow][currentCol]);

        isWall[neighborRow][neighborCol] = false;
        isWall[currentRow][currentCol] =false;

        frontiers = getFrontiers(grid,currentRow,currentCol,isWall,visited);

        for(let i=0; i<frontiers.length;i++){
            frontiersList.push(frontiers[i]);
            let [row,col] = frontiers[i]
            visited[row][col] = true;
        }

        frontiersList.splice(selectedIdx,1)

        }

        
        for(let i=0;i<nodesToRemoveWall.length;i++){
            setTimeout(()=>{
                nodesToRemoveWall[i].classList.remove('wall');
            },i*mazeSpeed)
        }

        let delay = nodesToRemoveWall.length * mazeSpeed;
        
        //check if start or end is surrounded by walls;

        setTimeout(()=>{
            let [startRow, startCol] = start;
            let startNeighbors = getNeighbors(grid,startRow,startCol,false);
            
            if(startNeighbors.length==0){
    
                let possibleValidNeighbors = [[startRow+1,startCol],[startRow-1,startCol],[startRow,startCol+1],[startRow,startCol-1]]
    
                for (let i=0; i<possibleValidNeighbors.length;i++){
                    let [row,col] = possibleValidNeighbors[i];
    
                    if(row>=0 && row<grid.length && col>=0 && col<grid[0].length){
                        grid[row][col].classList.remove('wall');
                        break;
                    }
                }
            }
    
            let [endRow, endCol] = end;
            let endNeighbors = getNeighbors(grid,endRow,endCol,false);
            
            if(endNeighbors.length==0){
    
                let possibleValidNeighbors = [[endRow+1,endCol],[endRow-1,endCol],[endRow,endCol+1],[endRow,endCol-1]]
    
                for (let i=0; i<possibleValidNeighbors.length;i++){
                    let [row,col] = possibleValidNeighbors[i];
    
                    if(row>=0 && row<grid.length && col>=0 && col<grid[0].length){
                        grid[row][col].classList.remove('wall');
                        break;
                    }
                }
            }
    
    
            
           
        },delay)
        


        return delay

    }




//----------------Prime Algo Helpers---------------

const getFrontiers = (grid,currentRow,currentCol,isWall,visited)=>{
    let possibleNeighbors = [
        [currentRow,currentCol-2],
        [currentRow, currentCol+2],
        [currentRow-2, currentCol],
        [currentRow+2,currentCol]
    ]

    let frontiers=[]
    for(let i=0; i<possibleNeighbors.length; i++){
        let [row,col] = possibleNeighbors[i];
        if(row>=0 && row<grid.length && col>=0 && col<grid[0].length){
            if (isWall[row][col] && !visited[row][col]){
                frontiers.push([row,col])
            }
           
        }
    }

    return frontiers;
}

const getNeighborsPrime = (grid,currentRow,currentCol,isWall)=>{
    let possibleNeighbors = [
        [currentRow,currentCol-2],
        [currentRow, currentCol+2],
        [currentRow-2, currentCol],
        [currentRow+2,currentCol]
    ]

    let neighbors=[]
    for(let i=0; i<possibleNeighbors.length; i++){
        let [row,col] = possibleNeighbors[i];
        if(row>=0 && row<grid.length && col>=0 && col<grid[0].length){
            if (isWall[row][col]){
                continue
            }else{
                neighbors.push([row,col])
            }
           
        }
    }

    return neighbors;
}






//-----------------------
//    SPiral and Diagonal steps
//-----------------------
const spiral = (grid,mazeSpeed)=>{
    console.log('spiral start')
    const nodesToAnimate = [];

    let firstRow =0
    let lastRow = grid.length-1;
    let firstCol = 0;
    let lastCol = grid[0].length-1;

    while (lastRow-firstRow>2&& lastCol-firstRow>2){
        for(let col=firstCol;col<lastCol;col++){
            nodesToAnimate.push(grid[firstRow][col])
            //console.log(grid[firstRow][col])
        }
        for(let row=firstRow;row<lastRow;row++){
            nodesToAnimate.push(grid[row][lastCol])
        }
        for(let col=lastCol;col>firstCol;col--){
            nodesToAnimate.push(grid[lastRow][col])
        }
        for(let row=lastRow;row>firstRow+2;row--){
            nodesToAnimate.push(grid[row][firstCol+1])
        }

        nodesToAnimate.push(grid[firstRow+3][firstCol+2])
        nodesToAnimate.push(grid[firstRow+3][firstCol+3])
        firstRow += 3
        lastRow -= 3
        firstCol += 4
        lastCol -=3
    }

   let delay = animateCells(nodesToAnimate,'wall', 0, mazeSpeed)
   return delay
}


const dSteps = (grid,mazeSpeed)=>{
    console.log('dsteps start')
    const nodesToAnimate = [];
    let goingUp = false;
    const firstRow = 0;
    const lastCol= grid[0].length - 1;
    const firstCol = 0;
    const lastRow = grid.length - 1;
    let currentRow = 0;
    let currentCol = 0;
    while (true){
        if ((currentRow == lastRow && currentCol>=lastCol-4) || (currentCol==lastCol && currentRow>=lastRow-4)){
            let delay = animateCells(nodesToAnimate,'wall',0,mazeSpeed);
            return delay;
        }
        nodesToAnimate.push(grid[currentRow][currentCol]);
        if(goingUp){

            if(currentRow==firstRow+1){
                if((lastCol - currentCol) <=3){
                    currentCol = lastCol-1;
                    goingUp = false
                }else{
                    currentCol += 3
                    goingUp = false;
                }

            }else if(currentCol==lastCol-1){

                currentRow += 3
                goingUp = false;


            }else{
                currentRow -= 1;
                 currentCol += 1;

            }
           
        }else{

            if(currentCol==firstCol){
                
                currentRow += 3;
                goingUp = true;

            }else if(currentRow==lastRow){
                
                currentCol += 3;
                goingUp = true;
            }else{
                currentRow += 1;
                currentCol -= 1;
            }

            
        }
    }
}

