let _ = q => document.querySelector(q)

// git iginore

let ball1 = _('#balls1')
let ball2 = _ ('#balls2')

let sec = _('section')

let accln = 1

//limit

let startX = sec.offsetLeft
let startY = sec.offsetTop
let endX = startX + 900
let endY = startY + 600

let coorOfCircle1 = {
	coors : {
		posX1 : null,
		posY1 : null,
		posX2 : null,
		posY2 : null,
		posX3 : null,
		posY3 : null,
		posX4 : null,
		posY4 : null 
	},
	center : {
		x : null,
		y : null
	},
	radius : null,
	diagonal : null
}

let coorOfCircle2 = {
	coors : {
		posX1 : null,
		posY1 : null,
		posX2 : null,
		posY2 : null,
		posX3 : null,
		posY3 : null,
		posX4 : null,
		posY4 : null 
	},
	center : {
		x : null,
		y : null
	},
	radius : null,
	diagonal : null
}

function Center (x1 , y1 , rad) {

	let cx = x1 + rad,
		cy = y1 + rad

	return {
		cx : cx,
		cy : cy
	}
}


function AllCoor (object , O , len) {
	// all four coordinates
	let x1 = object.offsetLeft, // ex x1 - 300
		y1 = object.offsetTop, // ex y1 - 300
		x2 = ( x1 + len ), // ex x2 = ( 300 + 100 )
		y2 = y1, // ex = y2 = 300
		x3 = ( x1 + len ), // ex = x3 = ( 300 + 100 )
		y3 = ( y1 + len ) // ex y3 = ( 300 + 100 )   
		x4 = x1,// ex  ( 300)
		y4 = ( y1 + len ) // ex- ( 300 + 400 )

	// find center

	// generate line apply distance formula for get ditance

	let diag = Math.floor(Math.sqrt(Math.pow((x3 - x1) , 2) + Math.pow((y3- y1) , 2)))

	let radius = len / 2

	let center = Center(x1 , y1 , radius)

	//  update Obejcts

	O.coors.posX1 = x1
	O.coors.posY1 = y1
	O.coors.posX2 = x2
	O.coors.posY2 = y2
	O.coors.posX3 = x3
	O.coors.posY3 = y3
	O.coors.posX4 = x4
	O.coors.posY4 = y4

	O.center.x = center.cx
	O.center.y = center.cy

	O.radius = radius

	O.diagonal = diag

}
// collision detecton formula

let ball1x1 = 1
let ball1y1 = 1
let ball2x1 = -1
let ball2y1 = -1


let x1s = 200
let y1s = 200
let x2s = 400
let y2s = 300


function CollsionDectect (event) {

	AllCoor(ball1 , coorOfCircle1 , 200)
	AllCoor(ball2 , coorOfCircle2 , 200)
	
	x1s = x1s + ball1x1
	y1s = y1s + ball1y1
	x2s = x2s + ball2x1
	y2s = y2s + ball2y1

	ball1.style.left =  x1s + "px"
	ball1.style.top =  y1s +  "px"
	ball2.style.left = 	x2s + "px"
	ball2.style.top = 	y2s + "px"

	if (coorOfCircle1.coors.posY4 >= coorOfCircle2.coors.posY1 && coorOfCircle1.coors.posY1 <= 		coorOfCircle2.coors.posY4 && coorOfCircle1.coors.posX2 >= coorOfCircle2.coors.posX1 && coorOfCircle1.coors.posX1 <= coorOfCircle2.coors.posX2) {
		console.log("collide" , coorOfCircle1.coors.posY4 , coorOfCircle1.coors.posY1)

		if (coorOfCircle1.coors.posY4 == coorOfCircle2.coors.posY1){ 
			console.log("top")
			ball1y1 = -1
			ball2y1 = 1
		}
		if (coorOfCircle1.coors.posX1 == coorOfCircle2.coors.posX2) {
			console.log("left")
			ball1x1 = 1
			ball2x1 = -1
		}
		if (coorOfCircle1.coors.posX2 == coorOfCircle2.coors.posX1) {
			ball1x1 = -1
			ball2x1 = 1
		}
		if (coorOfCircle1.coors.posY1 == coorOfCircle2.coors.posY4) {
			ball1y1 = 1
			ball2y1 = -1
		}
		
	}
	if (coorOfCircle1.center.x <= sec.offsetLeft) {
		console.log("left")
		ball1x1 = 1
	}
	if (coorOfCircle2.center.x <= sec.offsetLeft) {
		console.log("left")
		ball2x1 = 1
	}
	if (coorOfCircle2.center.x >= (sec.offsetLeft + 900)) {
		console.log("right")
		ball2x1 = -1
	}
	if ( coorOfCircle1.center.x >= (sec.offsetLeft + 900)) {
		console.log("right")
		ball1x1 = -1
	}
	if (coorOfCircle1.center.y <= sec.offsetTop) {
		console.log("top")
		ball1y1 = 1
	}
	if (coorOfCircle2.center.y <= sec.offsetTop) {
		console.log("top")
		ball2y1 = 1
	}
	if (coorOfCircle1.center.y >= sec.offsetTop + 600) {
		console.log("bottom")
		ball1y1 = -1
	}
	if (coorOfCircle2.center.y >= sec.offsetTop + 600){
		console.log("bottom")
		ball2y1 = -1
	}
	else {

	}

	// calculate collison


}

function Move(event) {
	CollsionDectect(event)
	console.log()
	ball1.style.left = event.clientX - 25 + "px";
	ball1.style.top = event.clientY - 25 + "px";
	console.log("yes")
}
function StartMove() {
	document.addEventListener('mousemove' , (event) => {
		Move(event)
	})
}


document.addEventListener("mousedown" , () => {
	StartMove()
})
document.addEventListener('mouseup' , () => {
	document.removeEventListener('mousedown' , StartMove)
})

setInterval(() => {
	
	CollsionDectect()
},1)