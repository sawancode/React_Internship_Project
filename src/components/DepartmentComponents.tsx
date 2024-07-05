import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

interface SubDepartment {
  id: number;
  name: string;
}

const departments: Department[] = [
  {
    id: 1,
    name: 'Department 1',
    subDepartments: [
      { id: 11, name: 'Sub Department 1.1' },
      { id: 12, name: 'Sub Department 1.2' },
    ],
  },
  {
    id: 2,
    name: 'Department 2',
    subDepartments: [
      { id: 21, name: 'Sub Department 2.1' },
      { id: 22, name: 'Sub Department 2.2' },
    ],
  },
];

const DepartmentComponent: React.FC = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleExpand = (id: number) => {
    setExpanded(expanded.includes(id) ? expanded.filter(e => e !== id) : [...expanded, id]);
  };

  const handleSelect = (id: number, parent?: boolean) => {
    const newSelected = new Set(selected);
    if (selected.has(id)) {
      newSelected.delete(id);
      if (parent) {
        const department = departments.find(d => d.id === id);
        department?.subDepartments.forEach(sd => newSelected.delete(sd.id));
      }
    } else {
      newSelected.add(id);
      if (parent) {
        const department = departments.find(d => d.id === id);
        department?.subDepartments.forEach(sd => newSelected.add(sd.id));
      }
    }
    setSelected(newSelected);
  };

  const handleSubSelect = (deptId: number, subId: number) => {
    const newSelected = new Set(selected);
    if (selected.has(subId)) {
      newSelected.delete(subId);
    } else {
      newSelected.add(subId);
    }
    const department = departments.find(d => d.id === deptId);
    if (department && department.subDepartments.every(sd => newSelected.has(sd.id))) {
      newSelected.add(deptId);
    } else {
      newSelected.delete(deptId);
    }
    setSelected(newSelected);
  };

  return (
    <List>
      {departments.map(dept => (
        <div key={dept.id}>
          <ListItem button onClick={() => handleExpand(dept.id)}>
            <ListItemIcon>
              <Checkbox
                checked={selected.has(dept.id)}
                onChange={() => handleSelect(dept.id, true)}
              />
            </ListItemIcon>
            <ListItemText primary={dept.name} />
            {expanded.includes(dept.id) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expanded.includes(dept.id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.subDepartments.map(subDept => (
                <ListItem key={subDept.id} button style={{ paddingLeft: 32 }}>
                  <ListItemIcon>
                    <Checkbox
                      checked={selected.has(subDept.id)}
                      onChange={() => handleSubSelect(dept.id, subDept.id)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentComponent;
