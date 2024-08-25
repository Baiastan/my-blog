import React from "react";

import { fetchPostDetails } from "../../fetch-api/fetch-post-utils";
import PostHeader from "@/app/components/common/header/PostHeader";
import PostCard from "@/app/components/common/post-card/PostCard";
import Header from "@/app/components/common/header/Header";
import CodeSnippet from "@/app/components/common/code-snippet/CodeSnippet";
import AnchorLink from "@/app/components/common/anchor-link/AnchorLink";

const HigherOrderComponents = async () => {
  const post = await fetchPostDetails("higher-order-components");

  return (
    <>
      <PostHeader>{post.title}</PostHeader>
      <PostCard>
        <p>
          In React, a Higher-Order Component (HOC) is a function that takes a component and returns a new component with
          additional props, state, or behavior. HOCs are a common pattern used for code reuse and for adding
          functionality to components without modifying them directly.
        </p>
        <p>
          A Higher-Order Component is not a part of the React API. It is a pattern that emerges from React’s
          compositional nature. Essentially, an HOC is a function that takes a component and returns a new component
          with added functionalities.
        </p>

        <Header size="xl">HOCs are useful for:</Header>

        <AnchorLink
          href="#post-1"
          text="Reusing Component Logic: Share common functionality across multiple components."
        ></AnchorLink>
        <AnchorLink
          href="#post-2"
          text="Side Effects and State Management: Implement additional state management or lifecycle logic."
        ></AnchorLink>
        <AnchorLink
          href="#post-3"
          text="Code Organization: Separate concerns by encapsulating logic outside of components."
        ></AnchorLink>
        <AnchorLink
          href="#post-4"
          text="Manipulating Props: Add, modify, or filter the props passed to components."
        ></AnchorLink>
      </PostCard>

      <PostCard id="post-1">
        <Header>Reusing Component Logic: Share common functionality across multiple components.</Header>
        <CodeSnippet>{`import React, { useState, useEffect } from "react";

// HOC to detect device type (mobile or desktop)
const withDeviceDetection = (WrappedComponent) => {
  return (props) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkDevice = () => {
        if (typeof window !== "undefined") {
          const userAgent = window.navigator.userAgent;
          const mobileDevicePattern = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
          setIsMobile(mobileDevicePattern.test(userAgent));
        }
      };

      checkDevice();

      // Optional: Listen to window resize events to re-check device type
      const handleResize = () => checkDevice();
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on unmount
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <WrappedComponent isMobile={isMobile} {...props} />;
  };
};

export default withDeviceDetection;`}</CodeSnippet>
        <Header>The usage of HOC</Header>
        <CodeSnippet>{`import React from "react";
import withDeviceProtection from './withDeviceProtection'

const DeviceSpecificContent = ({ isMobile }) => {
  return (
    <div>
      {isMobile ? (
        <h1>Welcome Mobile User!</h1>
      ) : (
        <h1>Welcome Desktop User!</h1>
      )}
      <p>
        This content changes based on whether you are using a mobile device or a desktop browser.
      </p>
    </div>
  );
};

export default withDeviceProtection(DeviceSpecificContent);`}</CodeSnippet>
      </PostCard>
      <PostCard id="post-2">
        <Header>Side Effects and State Management: Implement additional state management or lifecycle logic.</Header>
        <CodeSnippet>{`import React, { useEffect, useState } from 'react';

const withLoader = (WrappedComponent, url) => {
  return (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const getData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      };
      getData();
    }, []);

    if (!data) {
      return <div>...Loading</div>;
    }

    return <WrappedComponent {...props} dataPassedWithHOC={data} />;
  };
};

export default withLoader;`}</CodeSnippet>
        <Header>The usage of HOC</Header>
        <CodeSnippet>{`import React from 'react';
import withLoader from './withLoader';

        
const DataLoadingWithHoc = ({ dataPassedWithHOC }) => {
  return (
    <div>
      <h1>Data Loading with HOC</h1>
        <p>
          {dataPassedWithHOC.map((post) => {
            return (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
              );
          })}
        </p>    
    </div>
  );
};
        
export default withLoader(DataLoadingWithHoc, 'https://jsonplaceholder.typicode.com/posts?_page=1');`}</CodeSnippet>
      </PostCard>
      <PostCard id="post-3">
        <Header>Code Organization: Separate concerns by encapsulating logic outside of components.</Header>
        <CodeSnippet>{`import React, { useState } from "react";

// HOC for toggling visibility
const withToggleVisibility = (WrappedComponent) => {
  return (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);
    const toggle = () => setIsVisible((prev) => !prev);

    return (
      <>
        {/* Pass visibility state and toggle methods as props */}
        <WrappedComponent
          isVisible={isVisible}
          show={show}
          hide={hide}
          toggle={toggle}
          {...props}
        />
      </>
    );
  };
};

export default withToggleVisibility;`}</CodeSnippet>
        <Header>The usage of HOC</Header>
        <CodeSnippet>{`import React from "react";
import withToggleVisibility from './withToggleVisibility';

const ToggleableContent = ({ isVisible, show, hide, toggle }) => {
  return (
    <div>
      <h2>Visibility Toggle Example</h2>
      <button onClick={toggle}>
        {isVisible ? "Hide Content" : "Show Content"}
      </button>
      {isVisible && <p>This content is toggled by clicking the button above.</p>}
    </div>
  );
};

export default withToggleVisibility(ToggleableContent);`}</CodeSnippet>
      </PostCard>
      <PostCard id="post-4">
        <Header>Manipulating Props: Add, modify, or filter the props passed to components.</Header>
        <CodeSnippet>{`import React from "react";

// HOC to manipulate props
const withModifiedProps = (WrappedComponent) => {
  return (props) => {
    // Add a new prop
    const newProp = { addedProp: "This is a new prop added by the HOC" };

    // Modify an existing prop
    const modifiedProps = {
      ...props,
      message: props.message ? props.message.toUpperCase() : "DEFAULT MESSAGE",
    };

    // Filter out unwanted props
    const { unwantedProp, ...filteredProps } = modifiedProps;

    // Combine all props
    const combinedProps = { ...filteredProps, ...newProp };

    return <WrappedComponent {...combinedProps} />;
  };
};

export default withModifiedProps;`}</CodeSnippet>
        <Header>The usage of HOC</Header>
        <CodeSnippet>{`import React from "react";
import withModifiedProps from './withModifiedProps'

const DisplayProps = ({ message, addedProp }) => {
  return (
    <div>
      <h2>Displaying Modified Props</h2>
      <p>{message}</p>
      <p>{addedProp}</p>
    </div>
  );
};

export default withModifiedProps(DisplayProps);`}</CodeSnippet>
      </PostCard>
    </>
  );
};

export default HigherOrderComponents;
