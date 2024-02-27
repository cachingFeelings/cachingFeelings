import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Sphere = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const retrieveMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:8080/api/user/getMatches/", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        });
        const data = await res.json();
        const users = data.listUsers.map(user => ({
          id: user._id,
          username: user.username,
          interests: user.interests
        }));
        setMatches(users);
      } catch (err) {
        console.error("Error retrieving matches:", err);
      }
    };

    retrieveMatches();
  }, []);

  console.log(`the matchs are: ${matches}`); 
  const mountRef = useRef(null);

  useEffect(() => {
    var aboveNavBar = document.querySelector('.above-navigation-bar');
    var navBar = document.querySelector('.navigation-bar');
    var totalHeight = aboveNavBar.offsetHeight + navBar.offsetHeight;
    var sphereHeight = window.innerHeight - totalHeight + 1;

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / sphereHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    var mountRefCurr = mountRef.current;

    renderer.setSize(window.innerWidth, sphereHeight);
    mountRefCurr.appendChild(renderer.domElement);

    let group = new THREE.Group();
    scene.add(group);
    camera.position.z = 10;

    const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const labels = [];

    console.log(Array.isArray(matches))

    matches.forEach((match, index) => {
      const material = new THREE.MeshBasicMaterial({ color: 0xabcdef });
      const node = new THREE.Mesh(nodeGeometry, material);
      node.userData = match;

      const phi = Math.acos(-1 + (2 * index) / matches.length);
      const theta = Math.sqrt(matches.length * Math.PI) * phi;
      node.position.x = 4.5 * Math.cos(theta) * Math.sin(phi);
      node.position.y = 4.5 * Math.sin(theta) * Math.sin(phi);
      node.position.z = 4.5 * Math.cos(phi);

      group.add(node);

      const spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateSpriteCanvas(match.username)),
        depthTest: false
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.userData = match;
      sprite.position.copy(node.position).add(new THREE.Vector3(0, -0.25, 0));
      sprite.scale.set(1, 0.5, 1);
      group.add(sprite);
      labels.push(sprite);
    });

    const onWindowResize = () => {
      var aboveNavBar = document.querySelector('.above-navigation-bar');
      var navBar = document.querySelector('.navigation-bar');
      var totalHeight = aboveNavBar.offsetHeight + navBar.offsetHeight;
      var sphereHeight = window.innerHeight - totalHeight + 1;
      camera.aspect = window.innerWidth / sphereHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, sphereHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      event.preventDefault();
      
      mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(group.children, true);
      
      const rayDirection = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize();
      const arrowHelper = new THREE.ArrowHelper(rayDirection, camera.position, 100, 0xff0000);
      scene.add(arrowHelper);

      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id;
        const username = intersects[0].object.userData.username;
        const interests = intersects[0].object.userData.interests;

        // user profile pop up window
        window.alert(`Node User ID: ${id}\nNode Username: ${username}\nNode Interests: ${interests}`);
      }
    };

    renderer.domElement.addEventListener('click', onMouseClick, false);
    
    const drag = {
      isDragging: false,
      previousMousePosition: { x: 0, y: 0 },
      rotationVelocity: { x: 0, y: 0 },
      autoRotateSpeed: { x: 0.001, y: 0.001 }
    };

    const onMouseDown = (event) => {
      drag.isDragging = true;
      drag.previousMousePosition.x = event.clientX;
      drag.previousMousePosition.y = event.clientY;
    };

    const onMouseMove = (event) => {
      if (drag.isDragging) {
        const deltaMove = {
          x: event.clientX - drag.previousMousePosition.x,
          y: event.clientY - drag.previousMousePosition.y,
        };

        const rotateSpeed = 0.005;
        group.rotation.y += deltaMove.x * rotateSpeed;
        group.rotation.x += deltaMove.y * rotateSpeed;

        drag.rotationVelocity.x = deltaMove.x * rotateSpeed;
        drag.rotationVelocity.y = deltaMove.y * rotateSpeed;

        drag.previousMousePosition.x = event.clientX;
        drag.previousMousePosition.y = event.clientY;
      }
    };

    const onMouseUp = () => {
      drag.isDragging = false;
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);

      if (!drag.isDragging) {
        group.rotation.y += drag.autoRotateSpeed.y;
        group.rotation.x += drag.autoRotateSpeed.x;
        group.rotation.y += drag.rotationVelocity.x;
        group.rotation.x += drag.rotationVelocity.y;
        drag.rotationVelocity.x *= 0.95;
        drag.rotationVelocity.y *= 0.95;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (mountRefCurr) {
        mountRefCurr.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', onWindowResize);
    };
  }, [matches]);

  function generateSpriteCanvas(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    context.fillStyle = '#FFFFFF';
    context.font = '40px Arial';
    context.fillText(text, 0, 48);
    return canvas;
  }
  
  return <div ref={mountRef} style={{ width: '100%', height: '100%'}}></div>;
};

export default Sphere;
