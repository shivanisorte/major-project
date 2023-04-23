import axios from 'axios'
import AppNav from '../../components/AppNav';
import React, { useEffect, useState } from 'react'
import ApplicationProjectCard from '../components/ApplicationProjectCard';
import { Center, Heading, useToast } from '@chakra-ui/react';


const Applications = () => {
  const [projects, setProjects] = useState([]);
  const [yourProjects, setYourProjects] = useState([]);
  const [uploadBy, setUploadBy] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("http://localhost:3001/projectHub");
        console.log(resp.data.projects);
        if (resp.data.success === true) {
          setProjects(resp.data.projects);
        }

        const response = await axios.get("http://localhost:3001/guide", {
          withCredentials: true,
        });
        if (response.data.success === true) {
          console.log(response.data.guide._id);
          setUploadBy(response.data.guide._id);
        }

      } catch (error) {
        if (error.response) {
          toast({  
            title: "Try again",
            description: "Please refresh.",
            status: "warning",
            duration: 6000,
            isClosable: true,
          });
        } else if (error.request) {
          toast({
            title: "Internal Server Error",
            description: "Please try again later.",
            status: "error",
            duration: 6000,
            isClosable: true,
          });
          console.log(error.request);
        } else {
          toast({
            title: "Check your internet connection",
            description:
              "Please check your internet connection and try again.",
            status: "error",
            duration: 6000,
            isClosable: true,
          });
        }

        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filterProjectsByUploadBy = () => {
    const filteredProjects = projects.filter(project => project.uploadedBy === uploadBy);
    console.log(filteredProjects);
    setYourProjects(filteredProjects);
  }

  useEffect(() => {
    filterProjectsByUploadBy();
  }, [uploadBy]);

  const toast = useToast();

  return (
    <div style={{ 
        background: "linear-gradient(15deg, rgba(255, 255, 255, 1) 50%, rgba(183, 148, 244, 0.4) 50.1%)"
      }}>
        <AppNav></AppNav>
        <Center>
        <Heading as="h2" size="xl" my={8}>
          Applications
        </Heading>
        </Center>
    {yourProjects ? (
      yourProjects.map((project) => (
        <ApplicationProjectCard
          key={project.id}
          title={project.title}
          domain={project.domain}
          type={project.projectType}
          numApplications={project.applications.length}
          applications = {project.applications}
          toast={toast}
        //   onViewApplications={() => {
        //     // handle the view applications button click here 
        //   }}
        />
      ))
    ) : (
      <div>Loading...</div> 
    )}
  </div>
  )
}

export default Applications
