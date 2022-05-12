import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { asyncReducer } from "./asyncReducer";

function Users() {
	const [state, dispatch] = useReducer(asyncReducer, {
		loading: false,
		data: null,
		error: null,
	});

	const fetchUsers = async () => {
		dispatch({ type: "LOADING" });
		try {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/users"
			);
			dispatch({ type: "SUCCESS", data: response.data });
		} catch (e) {
			dispatch({ type: "ERROR", error: e });
			console.log(e.response.status);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const { loading, data: users, error } = state;
	if (loading) return <div>로딩중..</div>;
	if (error) return <div>에러가 발생했습니다</div>;
	if (!users) return null;

	return (
		<>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.username} ({user.name})
					</li>
				))}
			</ul>
			<button onClick={fetchUsers}>다시 불러오기</button>
		</>
	);
}

export default Users;
