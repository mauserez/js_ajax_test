let xmlExample = `
	<list>
		<student>
			<name lang="en">
			<first>Ivan</first>
			<second>Ivanov</second>
			</name>
			<age>35</age>
			<prof>teacher</prof>
		</student>
		<student>
			<name lang="ru">
			<first>Петр</first>
			<second>Петров</second>
			</name>
			<age>58</age>
			<prof>driver</prof>
		</student>
	</list>
`;

let parser = new DOMParser();
let xmlDom = parser.parseFromString(xmlExample, "text/xml");
let objFromXml = { list: [] };

[...xmlDom.querySelectorAll("student")].forEach((el) => {
	let studentFirstName = el.querySelector("first").innerHTML;
	let studentSecondName = el.querySelector("second").innerHTML;
	let studentObj = {
		name: `${studentFirstName} ${studentSecondName}`,
		age: el.querySelector("age").innerHTML,
		prof: el.querySelector("prof").innerHTML,
		lang: el.querySelector("name").getAttribute("lang"),
	};
	objFromXml.list.push(studentObj);
});

console.log(objFromXml);
