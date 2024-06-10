 // Sélectionner le bouton "Désactiver"
    const btnDeactivate = document.getElementById('btn-deactivate');

    // Ajouter un gestionnaire d'événements pour le clic sur le bouton "Désactiver"
    btnDeactivate.addEventListener('click', function() {
        // Rediriger l'utilisateur vers la page principale
        window.location.href = "index.html";
    });
