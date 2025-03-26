# CS3 Website Project
### by Sr29 TIGLAO and Sr28 TAN

## Update Plan

  For this update, we plan to integrate persistent data (using JSON) in our website. Specifically, we will use this to save and store user's data so that they don't have to enter it in every time they visit the website. Firstly, we will implement a system for users to sign up and log in to their accounts. Their account will contain all of their data, such as their notes, workout plans, etc.

  We will add a webpage dedicated to user's account sign-up and login. This will also be the options/settings page where users can set their website theme, weight, height, or other account-specific content which will be saved to the appropriate JSON file. We will also update the Home, Fitness, and Work pages to make us of JSON files. For example, the calorie calculator in the Fitness page will read data from a repective JSON file containing a user's relevant information.

  ### Specific JSON use plan
  #### Below is an example of how we will implement JSON in our website:
  ```
  Type of Data: User account login and account details
  Purpose:
  JSON structure:
    account {
      username: string,
      password: string,
      pfp: image link,
      theme: [

      ],
      plans: [
        {
          planName: string
          exercises: [
            {name: string, sets: number, reps: number}
          ]
        }
      ],
      notes: [

      ],
      agenda: [

      ],
    }
  ```

## Website Details
  1. **Title:** **Merge** <br>
    *Where work meets your fitness*
  2. **Brief Description:** <br>
    Merge, where your work meets your fitness, is a workspace for students who prioritize their academics and fitness. This workspace encourages students to keep a well-balanced life, through having a day-by-day goal-oriented approach to their priorities and tasks.
  3. **Outline:** The website will have one main webpage. This page will contain different sections each with their respective purposes. The sections will expand to full-size when prompted, allowing the user to focus on the contents of said section.<br>
  4. **JavaScript Integration:** Javascript can be integrated into many parts of the website, notably, it can be used to create new HTML elements (such as in the journal section and exercise plan explained above). It can also be used for design aspects such as animation between/throughout panels and for various visual effects in the website.<br>
  5. **Wireframe:** [Canva Link](https://www.canva.com/design/DAGVnRy9Nv4/ClX_k2_jI99MWqn3G5-Fng/edit?utm_content=DAGVnRy9Nv4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) <br> 
