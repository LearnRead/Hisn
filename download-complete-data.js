// Script pour télécharger toutes les données depuis l'API
// Exécutez ce script dans la console du navigateur sur le site original

async function downloadAllData() {
  try {
    console.log('Téléchargement des données depuis l\'API...');
    
    // Télécharger la liste principale
    const mainResponse = await fetch('http://www.hisnmuslim.com/api/ar/husn_ar.json');
    const mainData = await mainResponse.json();
    
    console.log('Données principales téléchargées:', mainData);
    
    // Télécharger le contenu détaillé pour chaque section
    const fullData = {
      "العربية": []
    };
    
    for (let item of mainData["العربية"]) {
      console.log(`Téléchargement de: ${item.TITLE}`);
      
      if (item.TEXT) {
        try {
          const contentResponse = await fetch(item.TEXT);
          const contentData = await contentResponse.json();
          
          // Ajouter le contenu à l'item
          item.CONTENT = contentData;
          console.log(`✓ Contenu téléchargé pour: ${item.TITLE}`);
        } catch (error) {
          console.log(`✗ Erreur pour ${item.TITLE}:`, error);
        }
      }
      
      fullData["العربية"].push(item);
    }
    
    // Sauvegarder dans un fichier JSON
    const jsonString = JSON.stringify(fullData, null, 2);
    
    // Créer un lien de téléchargement
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'complete_data.json';
    a.click();
    
    console.log('✅ Téléchargement terminé ! Fichier complete_data.json créé');
    console.log('Données complètes:', fullData);
    
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
  }
}

// Exécuter le téléchargement
downloadAllData();
