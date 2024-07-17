import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
	const [post, setPost] = useState({});
	const { slug } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
        console.log(slug);
		if (slug) {
			service.getPost(slug).then((response) => {
				if (response) {
                    console.log(response);
                    setPost(response);
                }
			});
		} else {
			navigate("/");
		}
        console.log("POST", post);
	}, [slug, navigate]);
    console.log("POST", post);

	return post ? (
		<div className="py-8">
			<Container>
                <h1>{slug}</h1>
				<PostForm post={post} />
			</Container>
		</div>
	) : null;
};

export default EditPost;
