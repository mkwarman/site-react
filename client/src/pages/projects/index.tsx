import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { FilterDrawer } from "../../components/filterDrawer";
import { SyntheticEvent, useCallback, useState } from "react";
import { FilterSectionTypeEnum, IFilterSectionSelect } from "../../components/filterDrawer/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import {
  LinkTypeEnum,
  ButtonTypeEnum,
  ILink,
  IProject,
  IProjectFilters
} from "./types";

const reactMarkdownComponents: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> | undefined = {
  // Add some padding before list bullets
  li: ({ node, ordered, ...props }) => <li style={{ marginLeft: "15px" }} {...props} />
}

const LinkTypeIconMap = {
  [LinkTypeEnum.DOWNLOAD]: <DownloadIcon />,
  [LinkTypeEnum.LINK]: <OpenInNewIcon />,
};

const placeholderProjects: IProject[] = [
  {
    id: "dealmonitor",
    name: "Deal Monitor",
    description: "I designed and built a service for monitoring and efficiently handling event-driven updates to a mortgage deal data object. Handlers in the service can expose methods for concurrently reacting to multiple event types and handle those changes while accessing cached external data for efficiency. Changes made by the handlers are then aggregated and applied as a single data event.",
    technologies: ["C#", "Software Architecture"]
  },
  {
    id: "wilqofrontendmigration",
    name: "Frontend Contract and Builder Migration",
    description: "I replaced the legacy builder and backend request contract implementation in Wilqo's frontend project. Previously, the frontend was using react-scripts with an old version of protoc generating request and response models that did not support tree-shaking. I planned and completed the effort to replace react-scripts with Vite, a new tool for protobuf type generation that supported tree-shaking, and an improved deployment pipeline with better developer experience. I completed all work over the course of multiple releases without any downtime or impact to application functionality, culminating in a knowledge transfer session demonstrating new features and an improved developer experience.",
    technologies: ["React", "Typescript", "Docker", "CI/CD", "Protobuf", "Software Architecture"]
  },
  {
    id: "thiswebsite",
    name: "This Website",
    description: "This website is built using React with Typescript. It is hosted on a DigitalOcean droplet running in a docker container behind an Nginx reverse proxy. The site has fully automated continuous integration using Jenkins running in an LXC hosted on my home server. Whenever a new update is merged into the main branch, Jenkins pulls the latest code, spins up a docker container to build the app, pushes a new docker image, then notifies the DigitalOcean droplet to pull and run the latest image.",
    technologies: ["React", "TypeScript", "Docker", "CI/CD", "Software Architecture"],
    links: [
      {
        buttonText: "View Source",
        linkType: LinkTypeEnum.LINK,
        buttonType: ButtonTypeEnum.PRIMARY,
        url: "https://github.com/mkwarman/site-react"
      },
    ],
  },
  {
    id: "ordermanagement",
    name: "Order Management Application",
    description: "I designed and built an order management web application for my father's business. The app can be loaded either as a progressive web application or a native mobile application. The application provides durable order creation, order tracking, customer data management, and reportability with configuration and data stored in a Postgres database. The application is fully dockerized and deployed automatically upon push to a github branch using a Jenkins CI/CD pipeline I built on my home server.",
    technologies: ["C#", "React", "TypeScript", "Ionic", "Postgres", "Jenkins", "Software Architecture"]
  },
  {
    id: "partiesrestructure",
    name: "Parties Restructing",
    description: "I led an inititive to restructure and update parties models within a mortgage deal's structure at Wilqo. The previous implementation worked by accepting unstructured data from multiple locations and loading it into the deal model after passing through a large amount of conditional business logic. The redesigned flow allows a single endpoint to accept structured data (defined by protobuf models) and a party type identifier. The endpoint then passes the request to a service that delegates the updates to handlers that self-identify as capable of acting on the event. Upon completion of the process, all changes are rolled up into a single change event that is persisted to the deal.",
    technologies: ["C#", "Protobuf", "Software Architecture"]
  },
  {
    id: "circuits",
    name: "Circuit/Interview Flow",
    description: "I designed and developed a solution to support fully configurable UI page flows. The flows are tenant-specific configurable JSON files stored in MongoDB and requested from the frontend. The flows support conditional routing via optional rule configuration. For example, circuits can be configured to route to a mailing address page if the user selects that this differs from their current address, or skip this page and proceed to employment information if not.",
    technologies: ["React", "TypeScript", "C#", "Protobuf", "MongoDB", "Software Architecture"]
  },
  {
    id: "accrualpolicies",
    name: "Accrual Policies",
    description: "I lead the design and development of the Accrual Policies feature suite at Zeal. The project involved automatically calculating accrued time based on worked hours for various policies according to their definition. For example, a customer can create a policy indicating that for every 80 hours worked, an employee should earn 8 hours of PTO. Rich policy customization supports defining initial balances, waiting periods, yearly caps, accrual caps, and more. I built this project using Typescript, Node, Express, and MongoDB. The project directly contributed to new customer relationships at Zeal.",
    technologies: ["TypeScript", "Node", "MongoDB", "Express", "Docker", "Software Architecture"],
    links: [
      {
        buttonText: "View Project",
        linkType: LinkTypeEnum.LINK,
        buttonType: ButtonTypeEnum.PRIMARY,
        url: "https://docs.zeal.com/docs/pto-and-sick-leave-accruals"
      },
    ],
  },
  {
    id: "recurringshifts",
    name: "Recurring Shifts",
    description: "I lead the design and development of the Recurring Shifts initiative for Paylocity's scheduler application to provide users a quick and easy way of creating shifts for their employees according to a set pattern. I started by working with product and UX teams to determine desired outcomes, presented technical considerations and identified possible side effects for discussion, and then documented planned architecture from database through frontend. Then, I presented my plans to the full development team to solicit feedback and iterate on the planned architecture. Next, I began the development of the initiative and continue to provide assistance to other developers as needed to ensure everyone is on the same page.",
    technologies: ["React", "C#", "SQL", "Software Architecture"],
  },
  {
    id: "defaultschedules",
    name: "Default Schedules",
    description: "I lead the design and development of the Default Schedule initiative for Paylocity's scheduling application to replace a previous legacy implementation. I started by working with product and UX teams to determine desired outcomes, align scope, and then document planned architecture from database through frontend. Then, I presented my plans to the full development team to solicit feedback and iterate on the planned architecture. Next, I lead the development of the initiative and provided assistance to other developers as needed to ensure everyone was on the same page, handling necessary changes as they come up in an Agile fashion. At approximately 90% MVP completion, I worked with dedicated QAE testers to host testing \"dojos\", to pressure test new features and their interactions with existing flows.",
    technologies: ["React", "C#", "SQL", "Software Architecture"],
  },
  {
    id: "papercuts",
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
    id: "3dcnn",
    name: "EEG Analysis using Convolutional Neural Networks",
    description: "For my capstone project at Kennesaw State University, I built a TensorFlow 3D convolutional neural network for comparing passive verses active task brain activity of 24-sensor electroencephalogram (EEG) wave data collected from subjects when they were tired verses well rested. I first trained the neural network using data collected during known activity and energy states, and then tested the neural network's ability to guess whether subjects were performing active or passive tests when tired verses well rested from test data. I also ran the tests using different prefilter options and programmatic pre-transformations such as 5-band Fourier (mapping to the 5 brain wave bands), and Wigner-Ville distribution. The results of the tests indicated that the neural network was noticeably better at classifying energy state between passive tasks verses active tasks.",
    technologies: ["Python", "TensorFlow", "Machine Learning"],
    links: [
      {
        buttonText: "View Source",
        linkType: LinkTypeEnum.LINK,
        buttonType: ButtonTypeEnum.PRIMARY,
        url: "https://github.com/mkwarman/Active-Passive-Attention-3DCNN-Classification",
      },
      {
        buttonText: "Download Research Paper",
        linkType: LinkTypeEnum.DOWNLOAD,
        buttonType: ButtonTypeEnum.SECONDARY,
        url: "/static/EEGAnalysis.pdf",
      },
    ],
  },
  {
    id: "legacytemplates",
    name: "Repair of Legacy Recurring Template Generation",
    description: "Paylocity's legacy template generation process that was used to automatically great shifts for employees according to a set pattern was encountering errors resulting in missed generation and server resource contention. I volunteered to reverse engineer the legacy code and fix the problems to ensure the best experience for our customers. My final strategy to address the issues was two fold; first, I rewrote to automated execution flow to trigger via a queued job and to automatically back-date generation should the queue processor ever be heavily delayed. Second, I redesigned the generation flow to be limited to configurable maximums (rather than let users attempt to generate shifts 100 years into the future), and to limit recurring automated generation to one week at a time, one year in advance. The solution has been stable ever since.",
    technologies: ["Angular", "C#", "SQL"],
  },
  {
    id: "alibabapaylater",
    name: "Alibaba PayLater With Kabbage",
    description: "Helped build a full-stack solution to integrate Kabbage into Alibaba's checkout problems to ensure the best experience for our customers. My final strategy to address the issues was two fold; first, I rewrote to automated execution flow to trigger via a queued job and to automatically back-date generation should the queue processor ever be heavily delayed. Second, I redesigned the generation flow to be limited to configurable maximums (rather than let users attempt to generate shifts 100 years into the future), and to limit recurring automated generation to one week at a time, one year in advance. The solution has been stable ever since.",
    technologies: ["React", "C#", "SQL"],
  },
  {
    id: "kabbagecard",
    name: "Kabbage Card",
    description: "Helped build and support the rollout of the Kabbage Card, which allows customers to use their Kabbage line of credit on POS transactions. Implementation involved the construction of new microservices, updates to legacy platform code, database design changes, and front-end application improvements.",
    technologies: ["React", "C#", "SQL"],
  },
  {
    id: "paymentsgateway",
    name: "Construction, Maintenance, and Improvement of The Home Depot Payments Gateway",
    description: "Used a variety of technologies including React, Angular2, and Redux to develop and improve the primary payment gateway for Home Depot services. This gateway served as an efficient and stable way to take payments of multiple types while maintaining high security and familiar experience for Home Depot's customers. Work on this project ranged from back-end services for processing payments and running settlement tasks to front-end, customer facing UI development with assistance from UX developers. Given the environment of this project, performance and security were of the utmost importance.",
    technologies: ["React", "Angular"],
  },
]

const getInitialFilterSections = (projects: IProject[]): IProjectFilters => {
  const distinctTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies))).sort();
  const options = Object.fromEntries(distinctTechnologies.map(tech => [tech,
    { label: tech, key: tech, isChecked: false }
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

const getButtonLink = (link: ILink, key: number) => (
  <Button
    key={key}
    endIcon={LinkTypeIconMap[link.linkType]}
    href={link.url}
    target="_blank"
    color={link.buttonType}
  >
    {link.buttonText}
  </Button>
)

const sortButtons = (a: ILink) => a.buttonType === ButtonTypeEnum.PRIMARY ? 1 : 0

/* TODO:
 * - Load from api
 * - Add skeleton
 */
export const Projects = () => {
  const [expanded, setExpanded] = useState("");
  const [projects] = useState<IProject[]>(placeholderProjects);
  const [filters, setFilters] = useState(getInitialFilterSections(projects))
  const [shown, setShown] = useState(new Set(projects.map(p => p.id)))

  const onFilterChange = useCallback((newFilters: IProjectFilters) => {
    const selectedTechnologies = Object.values(newFilters.Technologies.options)
      .filter(option => option.isChecked).map(option => option.label);

    const newShown = new Set(selectedTechnologies.length > 0
      ? projects.filter(project => project.technologies.some(tech => selectedTechnologies.includes(tech))).map(p => p.id)
      : projects.map(p => p.id));

    setFilters(newFilters);
    setShown(newShown);

    if (newShown.size === 1) {
      setExpanded(newShown.values().next().value);
    }
  }, [setFilters, setShown, projects]);

  const handleChange = (index: string) => (_: SyntheticEvent, isExpanded: boolean) =>
    setExpanded(isExpanded ? index : "");

  const isFiltered = useCallback((project: IProject) => (shown.has(project.id)), [shown]);
  const isExpanded = useCallback((project: IProject) => (expanded === project.id), [expanded])

  return (
    <Box sx={{ display: 'flex' }} maxWidth={"lg"} mx={"auto"}>
      <Box mr={2} sx={{
        display: { xs: 'none', sm: 'block' },
      }}>
        <FilterDrawer filterSections={filters} width={240} onChange={onFilterChange} />
      </Box>
      <Box>
        {projects.map((project) =>
          <Accordion
            sx={{ opacity: isFiltered(project) ? "100%" : "50%" }}
            expanded={isExpanded(project)}
            onChange={handleChange(project.id)}
            key={project.id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${project.name}-content`}
              id={`${project.name}-header`}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="body1">
                  {project.name} {(!!project.links?.length) && <LinkIcon fontSize="inherit" />}
                </Typography>
                <Typography variant="subtitle2">{project.technologies.join(", ")}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <ReactMarkdown components={reactMarkdownComponents}>{project.description}</ReactMarkdown>
            </AccordionDetails>
            {(!!project.links?.length) && <AccordionActions>
              {project.links.sort(sortButtons).map((link, i) => getButtonLink(link, i))}
            </AccordionActions>}
          </Accordion>
        )}
      </Box>
    </Box>
  )
}
