# Preview
<p align="center">
  <img width="500px" src="./preview.gif">
</p>  

# Quick Start
```
<body>
	<!--canvas dom-->
    <canvas id="nav"></canvas>
</body>

<!--import script-->
<script src="./index.js"></script>

<script>
    const navAnimation = new NavAnimation({
        canvas: document.querySelector('#nav')
    })

    let timer = null
    setInterval(() => {
        navAnimation.trigger(100 + Math.random() * (window.innerWidth - 200))

        clearTimeout(timer)
        timer = setTimeout(() => {
            navAnimation.restore()
        }, 1000);

    }, 2000)

</script>
```

# API
## Attributes
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
		<td>width</td>
		<td>false</td>
		<td>number</td>
		<td>window.innerWidth</td>
		<td>canvas width</td>
	</tr>
	<tr>
		<td>height</td>
		<td>false</td>
		<td>number</td>
		<td>60</td>
		<td>canvas height</td>
	</tr>
</table>

## Functions
<table >
	<tr>
		<th >Function</th>
		<th >Input</th>
		<th >Description</th>
	</tr>
	<tr>
		<td>trigger</td>
		<td>x: Number</td>
		<td>trigger an animation among [x - 40, x + 40]</td>
	</tr>
	<tr>
		<td>restore</td>
		<td>---</td>
		<td>restore a triggered animation</td>
	</tr>
	<tr>
		<td>stop</td>
		<td>---</td>
		<td>stop the animation</td>
	</tr>
</table>