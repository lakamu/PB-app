
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Beranda } from './components/Beranda';
import { HistoryView } from './components/History';
import { Akunku } from './components/Akunku';
import { Item, Activity, AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('beranda');
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('pbp_items');
    return saved ? JSON.parse(saved) : [];
  });
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('pbp_activities');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pbp_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('pbp_activities', JSON.stringify(activities));
  }, [activities]);

  const addItem = (item: Item) => setItems(prev => [...prev, item]);
  
  const updateItem = (updatedItem: Item) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const addActivity = (activity: Activity) => setActivities(prev => [...prev, activity]);
  const deleteActivity = (id: string) => setActivities(prev => prev.filter(a => a.id !== id));

  const renderView = () => {
    switch (activeView) {
      case 'beranda':
        return <Beranda items={items} onAddItem={addItem} onDeleteItem={deleteItem} onUpdateItem={updateItem} />;
      case 'history':
        return <HistoryView activities={activities} items={items} onAddActivity={addActivity} onDeleteActivity={deleteActivity} />;
      case 'akunku':
        return <Akunku />;
      default:
        return <Beranda items={items} onAddItem={addItem} onDeleteItem={deleteItem} onUpdateItem={updateItem} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;
