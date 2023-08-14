import {
  Box,
  Card, CardContent, Grid, Typography
} from "@mui/material";
import { FilterDrawer } from "../../components/filterDrawer";
import { useCallback, useState } from "react";
import { IFilterSections, IFilterSection, FilterSectionTypeEnum, IFilterSectionSelect } from "../../components/filterDrawer/types";

interface IProject {
  name: string,
  description: string,
  technologies: string[]
}

interface IProjectFilters extends IFilterSections {
  Technologies: IFilterSection
}

const placeholderProjects: IProject[] = [
  {
    name: "test project 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    technologies: ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur"],
  },
  {
    name: "test project 2",
    description: "Lacinia at quis risus sed. Amet consectetur adipiscing elit pellentesque. Magna fringilla urna porttitor rhoncus dolor purus. Massa id neque aliquam vestibulum morbi blandit cursus risus. Eget nullam non nisi est sit amet facilisis. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Nibh venenatis cras sed felis eget velit aliquet sagittis. Turpis in eu mi bibendum neque egestas congue quisque. Elementum nisi quis eleifend quam adipiscing. Integer vitae justo eget magna. Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum. In ornare quam viverra orci sagittis eu volutpat odio. Purus gravida quis blandit turpis cursus.",
    technologies: ["lorem", "Lacinia", "dolor", "sit", "amet", "consectetur"],
  },
  {
    name: "test project 3",
    description: "Tristique risus nec feugiat in fermentum posuere urna nec. Id neque aliquam vestibulum morbi blandit. Egestas purus viverra accumsan in nisl. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Consequat semper viverra nam libero justo. Molestie at elementum eu facilisis sed odio morbi. Duis convallis convallis tellus id interdum velit laoreet id donec. Malesuada fames ac turpis egestas maecenas. Donec ultrices tincidunt arcu non sodales neque. Augue lacus viverra vitae congue eu consequat. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Duis ultricies lacus sed turpis tincidunt id aliquet. Aliquet risus feugiat in ante metus dictum at tempor commodo. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Pellentesque elit eget gravida cum sociis natoque penatibus et magnis. Neque vitae tempus quam pellentesque nec. Nibh tortor id aliquet lectus proin nibh.",
    technologies: ["lorem", "Lacinia", "fermentum", "sit", "amet", "consectetur"],
  },
  {
    name: "test project 4",
    description: "Arcu dictum varius duis at consectetur lorem donec. Enim nec dui nunc mattis enim ut tellus elementum sagittis. Urna duis convallis convallis tellus id interdum velit laoreet. Tellus orci ac auctor augue. Nunc id cursus metus aliquam eleifend mi. A scelerisque purus semper eget duis at tellus at urna. Est ante in nibh mauris cursus mattis molestie a. Arcu dui vivamus arcu felis bibendum ut tristique. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Varius quam quisque id diam vel quam elementum pulvinar. Et netus et malesuada fames. Magna etiam tempor orci eu lobortis elementum nibh. Porttitor eget dolor morbi non. Netus et malesuada fames ac turpis. Risus pretium quam vulputate dignissim suspendisse in est ante. Consequat ac felis donec et odio pellentesque diam volutpat. Senectus et netus et malesuada fames. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Adipiscing enim eu turpis egestas pretium aenean.",
    technologies: ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur"],
  },
  {
    name: "test project 5",
    description: "Arcu dictum varius duis at consectetur lorem donec massa sapien. Sed turpis tincidunt id aliquet risus feugiat in ante. Tellus mauris a diam maecenas sed enim. Donec ac odio tempor orci. Velit scelerisque in dictum non consectetur a erat. Lorem ipsum dolor sit amet consectetur. Maecenas pharetra convallis posuere morbi leo urna molestie at. Tempor orci dapibus ultrices in iaculis nunc sed. Sem integer vitae justo eget. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Viverra vitae congue eu consequat ac felis donec et. Neque egestas congue quisque egestas diam in arcu.",
    technologies: ["lorem", "Lacinia", "dolor", "sit", "donec", "consectetur"],
  },
  {
    name: "test project 6",
    description: "Imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis. Quis viverra nibh cras pulvinar mattis. Sed tempus urna et pharetra pharetra massa. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Blandit volutpat maecenas volutpat blandit aliquam. Proin nibh nisl condimentum id venenatis a condimentum. Sed euismod nisi porta lorem. Ultrices gravida dictum fusce ut placerat orci. Enim blandit volutpat maecenas volutpat blandit aliquam etiam. Habitasse platea dictumst quisque sagittis purus sit. Arcu ac tortor dignissim convallis aenean et tortor at. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Orci nulla pellentesque dignissim enim sit amet. Vitae sapien pellentesque habitant morbi tristique senectus et netus.",
    technologies: ["lorem", "ipsum", "dolor", "fermentum", "amet", "consectetur"],
  }
]

const getInitialFilterSections = (projects: IProject[]): IProjectFilters => {
  const distinctTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies)));
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

  console.log(initialFilterSections);

  return initialFilterSections;
}

/* TODO:
 * - Load from api
 * - Implement filtering
 * - Add skeleton
 */
export const Projects = () => {
  const [allProjects, setAllProjects] = useState(placeholderProjects);
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
  }, [setFilters, setProjects]);

  return (
    <Box sx={{ display: 'flex' }} maxWidth={"lg"} mx={"auto"}>
      <Box mr={2} sx={{
        display: { xs: 'none', sm: 'block' },
      }}>
        <FilterDrawer filterSections={filters} width={240} onChange={onFilterChange} />
      </Box>
      <Grid container spacing={2}>
        {projects.map((project, index) =>
          <Grid item key={index} xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{project.name}</Typography>
                <Typography variant="subtitle2" noWrap>{project.technologies.join(", ")}</Typography>
                <Typography paragraph sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}>{project.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
