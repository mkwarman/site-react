import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card, CardContent, Grid, Typography
} from "@mui/material";
import { FilterDrawer } from "../../components/filterDrawer";
import { SyntheticEvent, useCallback, useState } from "react";
import { IFilterSections, IFilterSection, FilterSectionTypeEnum, IFilterSectionSelect } from "../../components/filterDrawer/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// TODO: Consider an interface for some kind of IFilterable that would allow the filter sections to be constructed dynamically
// Ideally something that would also allow ordering the sections and options by their commonality in the data
interface IProject {
  id: number,
  name: string,
  description: string,
  technologies: string[],
  link?: string,
}

interface IProjectFilters extends IFilterSections {
  Technologies: IFilterSection
}

const placeholderProjects: IProject[] = [
  {
    id: 1,
    name: "Accrual Policies",
    description: "I lead the design and development of the Accrual Policies feature suite at Zeal. The project involved automatically calculating accrued time based on worked hours for various policies according to their definition. For example, a customer can create a policy indicating that for every 80 hours worked, an employee should earn 8 hours of PTO. Rich policy customization supports defining initial balances, waiting periods, yearly caps, accrual caps, and more. I built this project using Typescript, Node, Express, and MongoDB. The project directly contributed to new customer relationships at Zeal.",
    technologies: ["TypeScript", "Node", "MongoDB", "Express", "Software Architecture"],
    link: "https://docs.zeal.com/docs/pto-and-sick-leave-accruals",
  },
  {
    id: 2,
    name: "Recurring Shifts",
    description: "I lead the design and development of the Recurring Shifts initiative for Paylocity's scheduler application to provide users a quick and easy way of creating shifts for their employees according to a set pattern. I started by working with product and UX teams to determine desired outcomes, presented technical considerations and identified possible side effects for discussion, and then documented planned architecture from database through frontend. Then, I presented my plans to the full development team to solicit feedback and iterate on the planned architecture. Next, I began the development of the initiative and continue to provide assistance to other developers as needed to ensure everyone is on the same page.",
    technologies: ["React", "C#", "SQL", "Software Architecture"],
  },
  {
    id: 3,
    name: "Default Schedules",
    description: "I lead the design and development of the Default Schedule initiative for Paylocity's scheduling application to replace a previous legacy implementation. I started by working with product and UX teams to determine desired outcomes, align scope, and then document planned architecture from database through frontend. Then, I presented my plans to the full development team to solicit feedback and iterate on the planned architecture. Next, I lead the development of the initiative and provided assistance to other developers as needed to ensure everyone was on the same page, handling necessary changes as they come up in an Agile fashion. At approximately 90% MVP completion, I worked with dedicated QAE testers to host testing \"dojos\", to pressure test new features and their interactions with existing flows.",
    technologies: ["React", "C#", "SQL", "Software Architecture"],
  },
  {
    id: 4,
    name: "\"Paper Cuts\" Stability & Scalability Tiger Team",
    description: `In preparation for the busiest time of year for Paylocity, my category decided to form a volunteer tiger team to focus solely on addressing a number of performance issues across our application. I volunteered for this team and achieved some notable results:
* Optimized a query used for every API request in our app to be 43 times more CPU efficient and reduce logical reads by 98%.
* Created a wiki page and hosted a knowledge transfer session on how I did it.
* Rewrote a stored procedure used millions of times per second during peak punch hours to be about 3 times more CPU efficient and reduce logical reads by 93%.
* Removed multiple redundant executions of queries for session data called for every API request in our app Flattened nested loops and database calls to eliminate inefficient execution and mitigate connection pool contention.
* Replaced entity framework queries with SQL in many locations where entity framework generated inefficient queries
    `,
    technologies: ["C#", "SQL"],
  },
  {
    id: 5,
    name: "Comparison of Active and Passive Attention Based Tasks Using EEG Waves with Convolutional Neural Network",
    description: "For my capstone project at KSU, I built a TensorFlow 3D convolutional neural network for comparing passive verses active task brain activity of 24-sensor electroencephalogram (EEG) wave data collected from subjects when they were tired verses well rested. I first trained the neural network using data collected during known activity and energy states, and then tested the neural network's ability to guess whether subjects were performing active or passive tests when tired verses well rested from test data. I also ran the tests using different prefilter options and programmatic pre-transformations such as 5-band Fourier (mapping to the 5 brain wave bands), and Wigner-Ville distribution. The results of the tests indicated that the neural network was noticeably better at classifying energy state between passive tasks verses active tasks.",
    technologies: ["Python", "TensorFlow", "Machine Learning"],
    link: "https://github.com/mkwarman/Active-Passive-Attention-3DCNN-Classification",
  },
  {
    id: 6,
    name: "Repair of Legacy Recurring Template Generation",
    description: "Paylocity's legacy template generation process that was used to automatically great shifts for employees according to a set pattern was encountering errors resulting in missed generation and server resource contention. I volunteered to reverse engineer the legacy code and fix the problems to ensure the best experience for our customers. My final strategy to address the issues was two fold; first, I rewrote to automated execution flow to trigger via a queued job and to automatically back-date generation should the queue processor ever be heavily delayed. Second, I redesigned the generation flow to be limited to configurable maximums (rather than let users attempt to generate shifts 100 years into the future), and to limit recurring automated generation to one week at a time, one year in advance. The solution has been stable ever since.",
    technologies: ["Angular", "C#", "SQL"],
  },
  {
    id: 7,
    name: "Alibaba PayLater With Kabbage",
    description: "Helped build a full-stack solution to integrate Kabbage into Alibaba's checkout problems to ensure the best experience for our customers. My final strategy to address the issues was two fold; first, I rewrote to automated execution flow to trigger via a queued job and to automatically back-date generation should the queue processor ever be heavily delayed. Second, I redesigned the generation flow to be limited to configurable maximums (rather than let users attempt to generate shifts 100 years into the future), and to limit recurring automated generation to one week at a time, one year in advance. The solution has been stable ever since.",
    technologies: ["React", "C#", "SQL"],
  },
  {
    id: 8,
    name: "Kabbage Card",
    description: "Helped build and support the rollout of the Kabbage Card, which allows customers to use their Kabbage line of credit on POS transactions. Implementation involved the construction of new microservices, updates to legacy platform code, database design changes, and front-end application improvements.",
    technologies: ["React", "C#", "SQL"],
  },
  {
    id: 9,
    name: "Construction, Maintenance, and Improvement of The Home Depot Payments Gateway",
    description: "Used a variety of technologies including React, Angular2, and Redux to develop and improve the primary payment gateway for Home Depot services. This gateway served as an efficient and stable way to take payments of multiple types while maintaining high security and familiar experience for Home Depot's customers. Work on this project ranged from back-end services for processing payments and running settlement tasks to front-end, customer facing UI development with assistance from UX developers. Given the environment of this project, performance and security were of the utmost importance.",
    technologies: ["React", "Angular"],
  },
]

const getInitialFilterSections = (projects: IProject[]): IProjectFilters => {
  const distinctTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies))).sort();
  const options = Object.fromEntries(distinctTechnologies.map(tech => [tech,
    {label: tech, key: tech, isChecked: false} 
  ]));

  const initialFilterSections = {
    Technologies: {
      type: FilterSectionTypeEnum.SELECT,
      name: "Technologies",
      options,
    } as IFilterSectionSelect
  }

  return initialFilterSections;
}

/* TODO:
 * - Load from api
 * - Implement filtering
 * - Add skeleton
 */
export const Projects = () => {
  const [allProjects] = useState(placeholderProjects);
  const [expanded, setExpanded] = useState(0);
  const [projects, setProjects] = useState<IProject[]>(allProjects);
  const [filters, setFilters] = useState(getInitialFilterSections(projects))

  const onFilterChange = useCallback((newFilters: IProjectFilters) => {
    const selectedTechnologies = Object.values(newFilters.Technologies.options)
      .filter(option => option.isChecked).map(option => option.label);

    const newProjects = selectedTechnologies.length > 0
      ? allProjects.filter(project => project.technologies.some(tech => selectedTechnologies.includes(tech)))
      : allProjects;

    setFilters(newFilters);
    setProjects(newProjects);

    if (newProjects.length === 1) {
      setExpanded(newProjects[0].id);
    }
  }, [setFilters, setProjects, allProjects]);

  const handleChange = (index: number) => (_: SyntheticEvent, isExpanded: boolean) =>
    setExpanded(isExpanded ? index : -1);

  return (
    <Box sx={{ display: 'flex' }} maxWidth={"lg"} mx={"auto"}>
      <Box mr={2} sx={{
        display: { xs: 'none', sm: 'block' },
      }}>
        <FilterDrawer filterSections={filters} width={240} onChange={onFilterChange} />
      </Box>
      <Box>
        {projects.map((project) =>
          <Accordion expanded={project.id === expanded} onChange={handleChange(project.id)} key={project.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${project.name}-content`}
              id={`${project.name}-header`}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="body1">{project.name}</Typography>
                <Typography variant="subtitle2">{project.technologies.join(", ")}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{project.description}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
    </Box>
  )
}
