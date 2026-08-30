import { useState } from 'react';

export default function WorkerRegister() {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const skillList = skills
      .split(',')
      .map((skill) => ({
        name: skill.trim(),
        proficiency: 3,
      }))
      .filter((skill) => skill.name);

    console.log({
      name,
      skills: skillList,
      availability: true,
    });

    alert('Worker profile saved!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Worker Registration — Skill Passport</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Skills (comma separated): Electrical, Solar, Wiring"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <br /><br />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}