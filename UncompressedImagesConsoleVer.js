	function debounce(func, wait) {
		let timeout;
		return function(...args) {
			const context = this;
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(context, args), wait);
		};
	}	

	const config = {
		attributes: true,
		childList: true,
		subtree: true,
		attributeFilter: ['src'],
	};

	const localObserver = new MutationObserver(callback);

	function centerImageBecauseRegularCSSWillNot() {
		const updateImagePositions = document.querySelectorAll('.imageContainer__04362 .lazyImg_dafbb7.processed-image.processed-grid-layout');

		updateImagePositions.forEach((image) => {
			const container = image.closest('.imageContent__24964.embedWrapper_c143d9.attachmentContentContainer_e8d7a1.attachmentContentItem_ef9fc2.obscured_dd8869.processed-grid-layout');
			if (container && image) {
				const containerHeight = container.clientHeight;
				const imageHeight = image.clientHeight;
				const translateY = (containerHeight - imageHeight) / 2;
				image.style.transform = `translateY(${translateY}px)`;
			}
		});
	}

	function enhanceAvatarQuality() {
		const avatarURLs = document.querySelectorAll(
		'img.avatar__08316[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar), img.avatar__991e2[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar)'
		);
		avatarURLs.forEach((image) => {
			let newSrc = image.src.replace(/\?size=\d*/, '');
			if (!newSrc.includes('?quality=lossless')) {
				newSrc += '?quality=lossless';
			}
			image.src = newSrc;
			image.classList.add('processed-avatar');
		});
	}
	
	function imagesExternalLinks() {
		const imgElements = document.querySelectorAll('img');
		imgElements.forEach(img => {
			const externalLink = /^(https:\/\/images-ext-\d+\.discordapp\.net\/external\/[^\/]+\/https\/[^?]+)\?.+$/;
			const match = img.src.match(externalLink);
			if (match) {
				img.src = match[1] + '?';
				img.classList.add('processed-external-link');
			}
		});
	}

	function enhanceIconQuality() {
		const iconURLs = document.querySelectorAll(
		'img.icon__0cbed[src^="https://cdn.discordapp.com/icons/"]:not(.processed-icon)'
		);
		iconURLs.forEach((image) => {
			let newSrc = image.src.replace(/\?size=\d*/, '');
			if (!newSrc.includes('?quality=lossless')) {
				newSrc += '?quality=lossless';
			}
			image.src = newSrc;
			image.classList.add('processed-icon');
		});
	}

	function adjustMaxWidthBasedOnCurrentWidth() {
		const imgElements = Array.from(document.querySelectorAll(".imageWrapper_fd6587.embedWrapper_c143d9.lazyImg_dafbb7.attachmentContentItem_ef9fc2.processed-single-layout"));

			function processNextImage(index) {
				if (index >= imgElements.length) {
					return;
				}

			const imgElement = imgElements[index];
			if (!imgElement.classList.contains("max-width-adjusted")) {
				const style = window.getComputedStyle(imgElement);
				let currentWidth = style.getPropertyValue('width');
				if (currentWidth === "0px") currentWidth = "auto";	
				imgElement.style.maxWidth = currentWidth;
				imgElement.classList.add("max-width-adjusted");
				/** console.log(`Adjusted max-width for image to ${currentWidth}`); **/
			}
			setTimeout(() => processNextImage(index + 1), 5);
			}
		processNextImage(0);
	}

	const SELECTOR_IMG_SRC = '.zoomLens_uOK8xV img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .layerContainer_d5a653 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .imageContainer__04362 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .vc-imgzoom-lens img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)';

	function convertMediaToCDN() {
		const mediaURLs = document.querySelectorAll(SELECTOR_IMG_SRC);
		mediaURLs.forEach((image) => {
			if (!image.classList.contains('gif__2aa16')) {
			image.src = image.src.replace(
				'https://media.discordapp.net/attachments',
				'https://cdn.discordapp.com/attachments'
			);
			image.classList.add('processed-image');
			}
		});
	}

	function replaceURLs() {
		const messages = document.querySelectorAll('.container_dbadf5');
			messages.forEach((message) => {
			const images = message.querySelectorAll('.imageDetails_1t6Zms');
				if (images.length === 1) {
					const image = images[0];
					image.style.display = 'inline-table';
					image.style.transform = 'translateX(5px) translateY(-0px)';
					image.style.lineHeight = 'unset';
					
					const parent = image.closest('.imageContent__24964.embedWrapper_c143d9.attachmentContentContainer_e8d7a1.attachmentContentItem_ef9fc2');
		if (parent) {
			parent.appendChild(image);
		}
		} else if (images.length > 1) {
				images.forEach((image) => {
					image.style.display = 'none';
				});
		}
	});

	const mediaURLs = document.querySelectorAll(SELECTOR_IMG_SRC);
		let index = 0;
		function processImage() {
			const image = mediaURLs[index];
			if (image && !image.src.includes('.gif')) {
				const newSrc = image.src.replace(
					'https://media.discordapp.net/attachments',
					'https://cdn.discordapp.com/attachments'
				);
	const offscreenImage = new Image();
	offscreenImage.src = newSrc;
	offscreenImage.onload = function () {
			try {
			const aspectRatio = offscreenImage.naturalWidth / offscreenImage.naturalHeight;
			const maxWidth = image.closest('.imageWrapper_fd6587').clientWidth;
			const maxHeight = image.closest('.imageWrapper_fd6587').clientHeight;
			let width = offscreenImage.naturalWidth;
			let height = offscreenImage.naturalHeight;
			if (width > maxWidth) {
				width = maxWidth;
				height = width / aspectRatio;
			}
			if (height > maxHeight) {
				height = maxHeight;
				width = height * aspectRatio;
			}
			image.src = newSrc;
			image.classList.add('processed-image');
			image.style.width = `${width}px`;
			} finally {
			index++;
			if (index < mediaURLs.length && !image.src.includes('.gif')) {
				this.animationFrame = requestAnimationFrame(processImage);
			}
		};
	}
	}
		this.animationFrame = requestAnimationFrame(processImage);
	}

	let imagesSingle = document.querySelectorAll('.container_dbadf5 .lazyImg_dafbb7.processed-image.processed-single-layout');
	imagesSingle.forEach((image) => {
		image.addEventListener('load', function () {
		const classElement = image.closest('.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-single-layout');
		if (classElement && image.naturalWidth > image.naturalHeight) {
			classElement.classList.add('auto-width-single');
		}		
		});
	});

	let imagesGrid = document.querySelectorAll('.container_dbadf5 .lazyImg_dafbb7.processed-image.processed-grid-layout');
	imagesGrid.forEach((image) => {
		image.addEventListener('load', function () {
		const classElement = image.closest('.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-grid-layout');
		if (classElement && image.naturalHeight > image.naturalWidth) {
			classElement.classList.add('auto-width-grid');
		}		
		});
	});
	}

	this.resizeListener = window.addEventListener('resize', debounce(centerImageBecauseRegularCSSWillNot, 100));

	function processImageSrc() {
	convertMediaToCDN();
	replaceURLs();
	checkForGridLayout();
	setTimeout(centerImageBecauseRegularCSSWillNot, 1000);
	}

	function callback(mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
				const addedImages = Array.from(mutation.addedNodes).flatMap((node) =>
				node.querySelectorAll
				? Array.from(node.querySelectorAll(SELECTOR_IMG_SRC))
				: []
			);

			addedImages.forEach((image) => {
				if (!image.src.includes('.gif')) {
				setImmediate(processImageSrc);
				}
			});
			} else if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
			if (!mutation.target.src.includes('.gif')) {
				processImageSrc();
				enhanceAvatarQuality();
				enhanceIconQuality();
				imagesExternalLinks();
			}
			}
		}
	}

	function checkForGridLayout() {
	const messages = document.querySelectorAll('.container_dbadf5');
	messages.forEach((message) => {
		const elements = message.querySelectorAll('.lazyImg_dafbb7, .imageContainer__04362, .lazyImgContainer__68fa8, .imageWrapper_fd6587, .imageContent__24964');
		const imageElements = message.querySelectorAll('.lazyImg_dafbb7');
		if (imageElements.length > 1) {
		elements.forEach((element) => {
			element.classList.remove('processed-single-layout');
			element.classList.add('processed-grid-layout');
		});
		} else if (imageElements.length === 1) {
		elements.forEach((element) => {
			element.classList.remove('processed-grid-layout');
			element.classList.add('processed-single-layout');
		});
		}
	});
	}

	function createUncompressedImagesCSSStyle() {
	const style = document.createElement('style');
	style.textContent = `

		.mediaAttachmentsContainer_edba75 {
			width: initial !important;
		}	
	
		.auto-width-single {
			width: auto !important;
			height: auto !important;
			max-width: 550px !important;
		}		
		
		.auto-width-single img {
			max-height: 350px !important;
		}

		.auto-width-grid {
			height: auto !important;
			max-width: 550px !important;
		}		
		
		.auto-width-grid img {

		}
	
		.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-single-layout {
			margin: initial !important;
		}
		
		.clickableWrapper__64072 {
			height: none !important;
		}
		
		.carouselModal_c0d5b7.zoomedCarouselModalRoot__1e2da.root_a28985.fullscreenOnMobile__96797 {
			display: flex !important;
			justify-content: center !important;
			align-items: center !important;
		}

		.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-grid-layout {
			display: -webkit-box !important;
		}
		
		.imageContent__24964.embedWrapper_c143d9.attachmentContentContainer_e8d7a1.attachmentContentItem_ef9fc2.processed-single-layout {
			height: auto !important;
			width: auto !important;
			max-width: 550px !important;		
		}

		.imageWrapper_fd6587.embedWrapper_c143d9.lazyImg_dafbb7.attachmentContentItem_ef9fc2.processed-single-layout {
			width: auto !important;
		}

		.imageDetails_1t6Zms {
			margin: 0.15rem 0 0rem !important;
		}

		.lazyImg_dafbb7.processed-image.processed-grid-layout {
			aspect-ratio: unset !important;
			display: grid !important;
			object-fit: cover !important;
		}
		
		.lazyImg_dafbb7 processed-image processed-single-layout {
			max-width: 550px !important;
		}	
	
		.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-grid-layout {
			max-width: 100% !important;
		}
		
		.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-single-layout {
			height: 100% !important;
		}
		
		.cursorPointer_B3uwDA {
			transform: translateY(2px) !important;
		}

		.spoilerContent__37bfa.spoilerContainer_b653f1 {
			background-color: rgba(255, 255, 255, 0);
		}

		.loadingOverlay__4d818 {
			aspect-ratio: unset !important;
		}

	`;
	document.head.appendChild(style);
	return style;
	}

	function runMutation() {
		convertMediaToCDN();
		replaceURLs();
		enhanceAvatarQuality();
		enhanceIconQuality();
		imagesExternalLinks();
		setTimeout(adjustMaxWidthBasedOnCurrentWidth, 3000);
		localObserver.observe(document, config);
	}

	runMutation();

	if (!this.UncompressedImagesCSSStyle) {
		this.UncompressedImagesCSSStyle = createUncompressedImagesCSSStyle();
	}
	
	this.mutationObserver = localObserver;

/**
* Version 3.20 of 'Uncompressed Images'
* Copyright (Boost Software License 1.0) 2023-2023 Knew
* Link to plugin: https://github.com/Knewest/uncompressed-discord-images
* Support server: https://discord.gg/NqqqzajfK4
*/
