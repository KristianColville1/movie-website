
### Development Build:

1. **Install Dependencies:**
   * Ensure you have Node.js version 16 installed on your system.
   * Run `nvm use 16` to switch to Node.js version 16.
   * Navigate to the project directory in your terminal.
   * Run `npm install` to install all project dependencies.
2. **Run Development Server:**
   * After installing dependencies, run `npm start` to start the development server.
   * This will launch the development build of the website in your default web browser.
   * The development server will automatically reload the page when you make changes to the source code.

### Production Build:

1. **Generate Production Build:**
   * To create a production build of the website, run `npm run build`.
   * This will compile and optimize the source code for production deployment.
   * The production build will be generated in the `build` directory of the project.
2. **Serve Production Build:**
   * You can serve the production build using a variety of methods, such as using a static file server or deploying to a web server.
   * If you have Python installed, you can use `python -m http.server` in the `build` directory to serve the production build locally.
   * Alternatively, you can use tools like `live-server` by navigating to the `build` directory and running `live-server` to serve the production build with live reload capabilities.
3. **Deployment:**
   * Once you have generated the production build, you can deploy it to your preferred hosting provider.
   * Upload the contents of the `build` directory to your web server or hosting provider's file system.
   * Ensure that your server is properly configured to serve static files, such as HTML, CSS, and JavaScript.
