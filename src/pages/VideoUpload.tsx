import { Box, Button, FormControl, TextField } from "@mui/material";
import { baseUrl } from "../utils/Utils";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const VideoUpload = () => {
  const { register, handleSubmit } = useForm();
  const [posts, setPosts] = useState({});
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("video", data.video[0]);
    formData.append("title", data.title);

    const upload = await axios
      .post(baseUrl + "/posts/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getEachPost = async () => {
      const res = await axios.get(baseUrl + `/posts/${id}`);
      const data = res.data;
      setPosts(data);
    };
    getEachPost();
  }, [handleSubmit, id]);
  console.log(posts);

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <FormControl>
          <TextField label='Title' {...register("title", { required: true })} />
          <TextField type='file' {...register("video", { required: true })} />
        </FormControl>
        <Button type='submit'>Upload</Button>
        <Box>
          <h3>{posts?.title}</h3>
          <video controls src={posts?.path}></video>
        </Box>
      </form>
    </Box>
  );
};

export default VideoUpload;
