/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "../../css/Collapsible.css";

const Collapsible = ({
  open,
  collapsibleClassName = "collapsible-card",
  headerClassName = "collapsible-header",
  titleClassName = "title-text",
  iconButtonClassName = "collapsible-icon-button",
  contentClassName = "collapsible-content",
  contentContainerClassName = "collapsible-content-padding",
  children,
  header,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [height, setHeight] = useState(open ? undefined : 0);
  const ref = useRef(null);
  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };
  //console.log(height);
  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;
    // @ts-ignore
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);
  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);
  return (
    <>
      <div className={collapsibleClassName}>
        <div>
          <div onClick={handleFilterOpening} className={headerClassName}>
            <div className={titleClassName}>{header}</div>
            <button type="button" className={iconButtonClassName}>
              <FontAwesomeIcon
                icon="chevron-right"
                className={isOpen ? "rotate-center down" : "rotate-center"}
              />
            </button>
          </div>
        </div>
        <div className={contentClassName} style={{ height }}>
          <div ref={ref}>
            <div className={contentContainerClassName}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collapsible;
