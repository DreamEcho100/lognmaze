const linksObj = {
	tools: ['convert_from_markdown_to_html'],
	cg_creative_arts: ['fractal_tree'],
	auth: [
		{
			type: 'query',
			queries: [
				{
					objective: 'signup',
				},
			],
		},
		{
			type: 'query',
			queries: [
				{
					objective: 'login',
				},
			],
		},
	],
};

const extraAppLinksArr: string[] = ['tools', 'cg_creative_arts'];

let item: keyof typeof linksObj;
for (item in linksObj) {
	if (Array.isArray(linksObj[item])) {
		linksObj[item].forEach((arrItem) => {
			if (!arrItem) return;
			if (typeof arrItem === 'object') {
				if (arrItem.type === 'query') {
					extraAppLinksArr.push(
						`${item}/?${(() => {
							let queriesStr = '';
							// let item: keyof typeof arrItem;

							if (arrItem && typeof arrItem === 'object') {
								if (arrItem.type === 'query') {
									arrItem.queries.forEach((query) => {
										queriesStr += `${(() => {
											let str = '';
											let queryItem: keyof typeof query;
											for (queryItem in query) {
												str +=
													(str.length !== 0 ? '&' : '') +
													`${queryItem}=${query[queryItem]}`;
											}
											return str;
										})()}`;
									});
								}
							}
							return queriesStr;
						})()}`
					);
				}
				return;
			}
			extraAppLinksArr.push(`${item}/${arrItem}/`);
		});
	}
}

export default extraAppLinksArr;
