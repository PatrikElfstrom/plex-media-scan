import { ButtonComponent } from "./ButtonComponent";
import { get } from "./fetch";
import { getMediaLocations } from "./getMediaFiles";
import { getMetadataKey } from "./getMetadataKey";
import { log, logError } from "./logger";
import { observe } from "./observe";

log("Running Plex Media Scan");

async function handleButtonClick() {
  const metadataKey = getMetadataKey();
  const { librarySectionID, mediaLocations } = await getMediaLocations(
    metadataKey
  );

  mediaLocations.forEach((location) => {
    refreshMediaLocation(librarySectionID, location);
  });
}

function addButtonTo(target: HTMLElement) {
  log(`Add button to`, target);
  const buttonLabel = browser.i18n.getMessage("buttonLabel");
  const button = ButtonComponent(buttonLabel);
  button.addEventListener("click", handleButtonClick);
  target.appendChild(button);
}

function removeButton(button: HTMLElement) {
  log(`Remove button`, button);
  button.remove();
}

async function refreshMediaLocation(librarySectionID: number, path: string) {
  log(`Scanning: librarySectionID: ${librarySectionID}, path: ${path}`);

  const url = new URL(
    `/library/sections/${librarySectionID}/refresh`,
    window.location.origin
  );

  url.searchParams.set("path", path);

  try {
    get(url);
  } catch (error) {
    logError(error);
  }
}

(async () => {
  if (document.querySelector("body > #plex") === null) {
    log("Not on the Plex web app");
    return;
  }

  observe({
    target: document.body,
    selectors: '[class^="CurrentSourceBreadcrumb-container"]',
    addedNodesCallback: (searchTarget) => {
      log("Element was added", searchTarget);
      addButtonTo(searchTarget);
    },
    // removedNodesCallback: (searchTarget) => {
    //   removeButton(refreshButton);
    // },
  });

  const breadcrumbContainer = document.querySelector<HTMLElement>(
    '[class^="CurrentSourceBreadcrumb-container"]'
  );

  if (breadcrumbContainer === null) {
    log("breadcrumbContainer does not exist");
    return;
  }

  const refreshButton = breadcrumbContainer.querySelector<HTMLElement>(
    "#pms-refresh-button"
  );

  if (refreshButton === null) {
    log("refreshButton does not exist, adding button");
    addButtonTo(breadcrumbContainer);
  } else {
    log("refreshButton exists, recreating button");
    removeButton(refreshButton);
    addButtonTo(breadcrumbContainer);
  }
})();
