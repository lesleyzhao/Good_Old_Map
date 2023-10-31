# Project Repository

This repository will be used for team projects.

Several sets of instructions are included in this repository. They should each be treated as separate assignments with their own due dates and sets of requirements.

1. See the [App Map & Wireframes](instructions-0a-app-map-wireframes.md) and [Prototyping](./instructions-0b-prototyping.md) instructions for the requirements of the initial user experience design of the app.

1. Delete the contents of this file and replace with the contents of a proper README.md, as described in the [project setup instructions](./instructions-0c-project-setup.md)

1. See the [Sprint Planning instructions](instructions-0d-sprint-planning.md) for the requirements of Sprint Planning for each Sprint.

1. See the [Front-End Development instructions](./instructions-1-front-end.md) for the requirements of the initial Front-End Development.

1. See the [Back-End Development instructions](./instructions-2-back-end.md) for the requirements of the initial Back-End Development.

1. See the [Database Integration instructions](./instructions-3-database.md) for the requirements of integrating a database into the back-end.

1. See the [Deployment instructions](./instructions-4-deployment.md) for the requirements of deploying an app.



# Instruction on how to set up and run the project 
## Git Workflow

   To make any editions to the project, please follow the below procedures.
    - Clone the master repository and work on your cloned copy. Do not fork a copy of the master repository.
    - Remember to follow the standard feature branch workflow for all user stories. 
    - After done with the changes on local copy, use git status to check the status to the project
    - Use git add . to stage the changes
    - Use git commit -m "summary of the staged changes"
    - git push origin master(main branch) and create a pull request.
    - When creating a pull request, please follow the syntax:

   
### Description

Please include a summary of the changes and the related issue. 
Please also include relevant motivation and context.
List any dependencies that are required for this change.

### Change List

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

### Testing

Please describe the tests that you ran to verify your changes.
Provide instructions so we can reproduce. Please also list any relevant details for your test configuration

To resolve any merge conflicts, we recommend you to use rebase to resolve conflicts or simply use web merge conflicts editor.


## Set Up Environment
   - To set up the environment, please first clone the project and open terminal, enter git clone xxx(cloned link of the master repository).
   - open a terminal, enter either front-end or back-end folder to use the command npm -i or npm install. This will help you to install all neccessary dependencies for the project.
   - run npm run dev in the folder containing node.js to initiate the local host.

## Build & Test the Project
   - We use React as the front-end, so when you want to build the project, open the terminal and type npm -start. Make sure to copy paste the localhost and the corresponding port website to your browser. 