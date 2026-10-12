document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------
    // 1. DYNAMICALLY CREATE SIDEBAR & OVERLAY
    // ----------------------------------------------------
    const sidebar = document.createElement("div");
    sidebar.id = "dynamic-sidebar";
    sidebar.innerHTML = `
        <div style="background-color: #232f3e; color: white; padding: 15px 20px; font-size: 1.1rem; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
            <span><i class="fa-solid fa-user"></i> Hello, Sign in</span>
            <span id="close-sidebar-btn" style="cursor: pointer; font-size: 1.5rem;">&times;</span>
        </div>
        <div style="padding: 20px; color: #111; font-size: 0.9rem; display: flex; flex-direction: column; gap: 15px;">
            <p style="font-weight: bold; font-size: 1rem; margin-bottom: 5px;">Trending</p>
            <a style="text-decoration: none; color: #111; cursor: pointer;">Today's Deals</a>
            <a style="text-decoration: none; color: #111; cursor: pointer;">Prime Video</a>
            <hr style="border: 0.5px solid #eee;">
            <p style="font-weight: bold; font-size: 1rem; margin-bottom: 5px;">Shop By Category</p>
            <a style="text-decoration: none; color: #111; cursor: pointer;">Clothes</a>
            <a style="text-decoration: none; color: #111; cursor: pointer;">Health & Personal Care</a>
            <a style="text-decoration: none; color: #111; cursor: pointer;">Furniture</a>
            <a style="text-decoration: none; color: #111; cursor: pointer;">Electronics</a>
            <a style="text-decoration: none; color: #111; cursor: pointer;">Pet Care</a>
            <hr style="border: 0.5px solid #eee;">
            <p style="font-weight: bold; font-size: 1rem; margin-bottom: 5px;">Help & Settings</p>
            <a style="text-decoration: none; color: #111; cursor: pointer;">Your Account</a>
            <a style="text-decoration: none; color: #111; cursor: pointer;">Customer Service</a>
        </div>
    `;

    Object.assign(sidebar.style, {
        position: "fixed",
        top: "0",
        left: "-300px",
        width: "280px",
        height: "100%",
        backgroundColor: "#ffffff",
        zIndex: "10000",
        transition: "left 0.3s ease",
        boxShadow: "2px 0 10px rgba(0,0,0,0.5)",
        overflowY: "auto"
    });

    const overlay = document.createElement("div");
    overlay.id = "dynamic-overlay";
    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "9999",
        display: "none"
    });

    document.body.appendChild(sidebar);
    document.body.appendChild(overlay);

    function openSidebar() {
        sidebar.style.left = "0";
        overlay.style.display = "block";
    }

    function closeSidebar() {
        sidebar.style.left = "-300px";
        overlay.style.display = "none";
    }

    const allPanelBtn = document.querySelector(".panel-all");
    if (allPanelBtn) {
        allPanelBtn.style.cursor = "pointer";
        allPanelBtn.addEventListener("click", openSidebar);
    }

    document.getElementById("close-sidebar-btn").addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    // ----------------------------------------------------
    // 2. SIGN-IN MODAL POPUP FUNCTIONALITY
    // ----------------------------------------------------
    const modal = document.createElement("div");
    modal.id = "signin-modal";
    modal.innerHTML = `
        <div style="background-color: white; padding: 25px; border-radius: 8px; width: 320px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); position: relative; font-family: Arial, sans-serif;">
            <span id="close-modal-btn" style="position: absolute; top: 10px; right: 15px; font-size: 1.5rem; cursor: pointer; color: #555;">&times;</span>
            <h2 style="font-size: 1.3rem; margin-bottom: 15px; color: #111;">Sign in</h2>
            <form id="signin-form">
                <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 5px;">Email or mobile phone number</label>
                <input type="text" id="user-email" required style="width: 100%; padding: 8px; margin-bottom: 12px; border: 1px solid #a6a6a6; border-radius: 3px; box-sizing: border-box;">
                
                <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 5px;">Password</label>
                <input type="password" id="user-password" required style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #a6a6a6; border-radius: 3px; box-sizing: border-box;">
                
                <button type="submit" style="width: 100%; background-color: #ffd814; border: 1px solid #fcd200; border-radius: 8px; padding: 9px; cursor: pointer; font-weight: bold;">Sign in</button>
            </form>
        </div>
    `;

    Object.assign(modal.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: "10001",
        display: "none",
        justifyContent: "center",
        alignItems: "center"
    });

    document.body.appendChild(modal);

    const signinBtn = document.querySelector(".nav-signin");
    if (signinBtn) {
        signinBtn.style.cursor = "pointer";
        signinBtn.addEventListener("click", function () {
            modal.style.display = "flex";
        });
    }

    document.getElementById("close-modal-btn").addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    document.getElementById("signin-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("user-email").value;
        alert("Welcome back! Signed in successfully as: " + email);
        modal.style.display = "none";
        
        // Update header signin text
        const signinText = document.querySelector(".nav-signin span");
        if (signinText) {
            signinText.textContent = "Hello, " + email.split("@")[0];
        }
    });

    // ----------------------------------------------------
    // 3. INTERACTIVE CART COUNTER
    // ----------------------------------------------------
    let cartCount = 0;
    const cartElement = document.querySelector(".nav-cart");
    
    const cartBadge = document.createElement("span");
    cartBadge.textContent = "0";
    Object.assign(cartBadge.style, {
        color: "#f08804",
        fontWeight: "bold",
        marginLeft: "5px",
        fontSize: "0.9rem"
    });
    if (cartElement) {
        cartElement.style.cursor = "pointer";
        cartElement.appendChild(cartBadge);
        
        cartElement.addEventListener("click", function () {
            alert("Aapke Cart mein " + cartCount + " items hain!");
        });
    }

    const productButtons = document.querySelectorAll(".box-content p");
    productButtons.forEach(function (btn) {
        btn.style.cursor = "pointer";
        btn.addEventListener("click", function (e) {
            cartCount++;
            cartBadge.textContent = cartCount;
            
            const originalText = e.target.innerText;
            e.target.innerText = "Added to Cart ✓";
            e.target.style.color = "#b12704";
            
            setTimeout(function () {
                e.target.innerText = originalText;
                e.target.style.color = "#007185";
            }, 1200);
        });
    });

    // ----------------------------------------------------
    // 4. SEARCH BAR INTERACTION
    // ----------------------------------------------------
    const searchIcon = document.querySelector(".search-icon");
    const searchInput = document.querySelector(".search-input");

    if (searchIcon && searchInput) {
        searchIcon.style.cursor = "pointer";
        
        function handleSearch() {
            const query = searchInput.value.trim();
            if (query !== "") {
                alert("Amazon par search ho raha hai: " + query);
            } else {
                searchInput.focus();
            }
        }

        searchIcon.addEventListener("click", handleSearch);
        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                handleSearch();
            }
        });
    }

    // ----------------------------------------------------
    // 5. BACK TO TOP SMOOTH SCROLL
    // ----------------------------------------------------
    const backToTopBtn = document.querySelector(".foot-panel1");
    if (backToTopBtn) {
        backToTopBtn.style.cursor = "pointer";
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});