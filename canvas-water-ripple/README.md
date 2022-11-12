# Preview
<p align="center">
  <img width="300px" src="./preview.gif">
</p>  

# Details
see [bilibili](https://www.bilibili.com/video/BV1eg411s7MG/?vd_source=49425bab58362860e5144079a81abf3e)

# Quick Start
```
<body>
  <!-- canvas dom -->
  <canvas id="ripple"></canvas>

  <!-- import js file -->
  <script src="./index.js"></script>

  <!-- animation -->
  <script>
      // get canvas
      const canvas = document.querySelector('#ripple')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // get image
      const water_img = new Image()
      water_img.src = './images/water.png' // set your image path here

      // init
      const water_ripple = new WaterRipple({
            canvas: canvas,
            background: water_img,
      })

      ////// animation //////
      water_ripple.animate()

      // set one ripple per second
      setInterval(()=>{
          let x = Math.floor(Math.random()*canvas.width)
          let y = Math.floor(Math.random()*canvas.height)
          water_ripple.ripple(x, y)
      }, 1000)

      // add mousemove event to canvas
      water_ripple.addMousemove()
  </script>
</body>
```
# API
## Ripple Attributes
<table >
	<tr>
		<th >Attribute</th>
		<th >Require</th>
		<th >Type</th>
		<th >Default</th>
		<th >Description</th>
	</tr>
	<tr>
		<td>canvas</td>
		<td>true</td>
		<td>html canvas</td>
		<td>---</td>
		<td>html element</td>
	</tr>
	<tr>
		<td>background</td>
		<td>true</td>
		<td>html image</td>
		<td>---</td>
		<td>html element</td>
	</tr>
	<tr>
		<td>amplitude</td>
		<td>false</td>
		<td>int</td>
		<td>512</td>
		<td>amplitude should >= 0 and <= 1024</td>
	</tr>
	<tr>
		<td>ripple_radius</td>
		<td>false</td>
		<td>int</td>
		<td>3</td>
		<td>radius of each ripple</td>
	</tr>
	<tr>
		<td>mousemove_interval</td>
		<td>false</td>
		<td>int</td>
		<td>50 (ms)</td>
		<td>interval of mousemove event</td>
	</tr>
	<tr>
		<td>animation_interval</td>
		<td>false</td>
		<td>int</td>
		<td>20 (ms)</td>
		<td>interval of animation</td>
	</tr>
	<tr>
		<td>resize</td>
		<td>false</td>
		<td>Boolean</td>
		<td>false</td>
		<td>canvas's size will keep pace with window's size</td>
	</tr>
</table>

## Ripple Functions
<table >
	<tr>
		<th >Function</th>
		<th >Input</th>
		<th >Description</th>
	</tr>
	<tr>
		<td>animate</td>
		<td>---</td>
		<td>animation start</td>
	</tr>
	<tr>
		<td>ripple</td>
		<td>( x: int, y: int )</td>
		<td>trigger a ripple at ( x, y )</td>
	</tr>
	<tr>
		<td>addMousemove</td>
		<td>---</td>
		<td>add mousemove event to canvas</td>
	</tr>
	<tr>
		<td>stop</td>
		<td>---</td>
		<td>stop animation</td>
	</tr>
	<tr>
		<td>resume</td>
		<td>---</td>
		<td>resume animation</td>
	</tr>

</table>

