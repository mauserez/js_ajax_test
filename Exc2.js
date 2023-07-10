let jsonExample = `
	{
		"list": [
			{
				"name": "Petr",
				"age": "20",
				"prof": "mechanic"
			},
			{
				"name": "Vova",
				"age": "60",
				"prof": "pilot"
			}
		]
	}
`;

let objFromJson = JSON.parse(jsonExample);

console.log(objFromJson);
