import React, { createContext, useState } from 'react';
import './ResearchContext.css';

export const ResearchContext = createContext();

export const ResearchProvider = ({ children }) => {
    const [researchProjects, setResearchProjects] = useState([
      {
        id: "rp1",
        title: "Artificial Intelligence",
        image: "/research_images/r_1.jpg",
        description: "",
        subProjects: [
          { id: "rp1_sp1", 
            title: "Machine Learning Principles",
            content: [
              { type: 'markdown', value: '**Linear Separability Example**' },
              { type: 'markdown', 
                value: `Consider a dataset with two features $x_1$ and $x_2$ in which the points
                (-1,-1),(1,1),(-3,-3),(4,4) belong to one class and (-1,1),(1,-1),(-5,2),(4,-8)
                belong to the other.  
                `
              },
              { type: 'markdown',
                value: `This dataset is not linearly separable, as there is no single straight line that 
                can be drawn to separate the two (i.e. the respective convex hulls of each dataset will intersect).
                Using features $x_1$ and $x_2$, in a linear classifier (i.e. $z=w^T \\phi(x) + b$, where $\\phi(x)=(\\phi_1(x)=x_1,\\phi_2(x)=x_2)$
                will fail in classifying this dataset due to a lack of nonlinearity.  
                `
              },
              { type: 'image', src: '/research_images/r_1_images/r_1_1.png' },
              { type: 'markdown', 
                value: `On the other hand, a representation, $z(x_1, x_2)$, which yields a linearly separable
                dataset is: $z(x_1, x_2)=x_1x_2$. This becomes clear from the plot below of the separating 
                hyperplane located at [0] on the number-line
               `
              },
              { type: 'image', src: '/research_images/r_1_images/r_1_2.png' },
              { type: 'markdown', 
                value: `So, the nonlinear transformations in classification problems are important because when the dataset is not
                linearly separable due to the convexity of the interlying classes, there is a need for a non-linear transformation, 
                as is performed and shown above, where the convex hulls of the two classes are now non-intersecting.
              `
              },
              { type: 'markdown', value: `**Bias Variance Tradeoff**` },
              { type: 'markdown', 
                value: `Derivation of bias-variance decomposition for a regression problem, i.e. proving that the
                expected mean squared error of a regression problem can be written as:  
                $E[MSE]=Bias^2+Variance+Noise$  
                Defining $MSE=\\frac{1}{t}\\sum_{i=1}^t (f(x_i)+\\epsilon-g(x_i))^2$  
                Then we can take the expectation value:  
                $E[(y-\\hat{y})^2]=E[(f(x)+\\epsilon-\\hat{y})^2]=
                E[(f(x)-g(x))^2]+E[\\epsilon^2]+2E[(f(x)-g(x))\\epsilon]=$  
                $=E[(f(x)-g(x))^2]+\\sigma_{\\epsilon}^2+2E[(f(x)-g(x))]E[\\epsilon]=E[(f(x)-g(x))^2]+\\sigma_{\\epsilon}^2=$  
                $=E[((f(x)-E[f(x)])-(g(x)-E[g(x)]))^2]+\\sigma_{\\epsilon}^2=$  
                $=E[(E[g(x)]-f(x))^2]+E[(g(x)-E[g(x)])^2]-2E[(f(x)-E[g(x)])(g(x)-E[g(x)])]+\\sigma_{\\epsilon}^2=$  
                $=(E[g(x)]-f(x))^2+E[(g(x)-E[g(x)])^2]-2(f(x)-E[g(x)])E[(g(x)-E[g(x)])]+\\sigma_{\\epsilon}^2=$  
                $=bias[g(x)]^2+var(g(x))-2(f(x)-E[g(x)])(E[g(x)]-E[g(x)])=$  
                $=bias[g(x)]^2+var(g(x))+\\sigma_{\\epsilon}^2$  
                That is, for one point $x$, expanding to t points in $x$:  
                $E[MSE]=E[\\frac{1}{t} \\sum_{i=1}^t (f(x_i)+\\epsilon-g(x_i))^2]=E[bias[g(x)]^2]+E[var(g(x))]+\\sigma_{\\epsilon}^2$
              `},
              { type: 'markdown', 
                value: `Now, lets look at an example for curve fitting. If we consider the case of $y(x)=x+sin(1.5x)+\\aleph(0,0.3)$, 
                where $\\aleph(0,0.3)$ is a normal distribution with mean 0 and variance 0.3. Let's generate 20 random samples from y.
                Now, we can use a weighted sum of polynomials as an estimator function for the $f(x)=x+sin(1.5x)$ part of the $y(x)$.
                Let the estimator function take the form of: $g_n(x)=\\beta_0 + \\beta_1x+\\beta_2x^2+...+\\beta_nx^n$. If we then 
                consider three candidate estimators $g_1$, $g_3$, $g_{10}$, we can estimate the coefficients of each estimator
                using the sampled dataset, plot, and see which are under and overfitting the data.
              `},
              { type: 'image', src: '/research_images/r_1_images/r_1_3.png' },
              { type: 'markdown', 
                value: `Going further still, lets look at the bias variance tradeoff directly for increasing model complexity (polynomial order)
                to determine, which polynomial model is best (i.e., at what polynomial model do bias and variance cross, 
                such that there is the least underfitting and overfitting and the fitting error is minimized)
              `},
              { type: 'image', src: '/research_images/r_1_images/r_1_4.png' },
              { type: 'markdown', 
              value: `Now, if we compare the no regularization results with L1 (Lasso) L2 (Ridge) regularizations we'll find the following values 
                      (having averaged over data 100 combinations)
              `},
              { type: 'image', src: '/research_images/r_1_images/r_1_5.png' },
              { type: 'markdown', value: '**Classifier Performance Example**' },
              { type: 'markdown', 
                value: `Let's compare the mean accuracy and wall time for datasets of increasing size using various classifiers.
              `},
              { type: 'image', src: '/research_images/r_1_images/r_1_6.png' },
              { type: 'image', src: '/research_images/r_1_images/r_1_7.png' },
              { type: 'markdown', value: 'References: ' }
            //   { type: 'animation', animationId: 'animation1' },
              // More content elements...
            ], 
          },
          { id: "rp1_sp2", 
            title: "Deep Learning Principles",
            content: [
                { type: 'text', value: 'Introduction to Information Theory in AI' },
            //   { type: 'image', src: '/path/to/image.jpg', alt: 'AI Concept' },
                { type: 'markdown', value: 'References: ' }
            //   { type: 'animation', animationId: 'animation1' },
                // More content elements...
            ], 
          },
          { id: "rp1_sp2", 
          title: "Computer Vision",
          content: [
              { type: 'text', value: 'Introduction to Information Theory in AI' },
          //   { type: 'image', src: '/path/to/image.jpg', alt: 'AI Concept' },
              { type: 'markdown', value: 'References: ' }
          //   { type: 'animation', animationId: 'animation1' },
              // More content elements...
          ], 
          },
          // More sub-projects for AI...
        ],
      },
      {
        id: "rp2",
        title: "Science",
        image: "/research_images/r_2.jpg",
        description: "",
        // Sub-projects for Science Crawler, if any...
      },
      {
        id: "rp3",
        title: "Finance + Economics",
        image: "/research_images/r_3.jpg",
        description: ""
      },
      // Other main projects...
    ]);
    return (
      <ResearchContext.Provider value={{ researchProjects, setResearchProjects }}>
        {children}
      </ResearchContext.Provider>
    );
  };