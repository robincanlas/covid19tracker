import { createBrowserHistory } from 'history';

export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
	return (Object.keys(target) as K[]).reduce(
		(res, key) => {
			if (!omitKeys.includes(key)) {
				res[key] = target[key];
			}
			return res;
		},
		{} as any
	);
}

export const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL
});
