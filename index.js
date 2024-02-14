const buildTree = async (data) => {
  const { services } = await data;
  const tree = document.getElementById("app");
  const ul = document.createElement("ul");
  tree.appendChild(ul);

  services.sort((a, b) => a.sorthead - b.sorthead);

  buildNode(services, null, ul);
};

const buildNode = (services, head, parent) => {
  services
    .filter((service) => service.head === head)
    .forEach((service) => {
      const li = document.createElement("li");
      const nodeClass = service.node === 1 ? "node" : "";
      li.innerHTML = `<span class="${nodeClass}">${service.name} (${service.price})</span>`;
      parent.appendChild(li);

      if (service.node === 1) {
        const ul = document.createElement("ul");
        li.appendChild(ul);
        buildNode(services, service.id, ul);
      }
    });
};

const getData = async () => {
  const response = await fetch("data.json");
  return response.json();
};

buildTree(getData());
